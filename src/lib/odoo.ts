// lib/odoo.ts
interface OdooCredentials {
  url: string;
  db: string;
  username: string;
  apiKey: string;
}

interface JobPosition {
  id: number;
  name: string;
  description?: string;
  department_id?: [number, string];
  location?: string;
  contract_type?: string;
  state: string;
  no_of_recruitment: number;
  applications_count?: number;
  create_date: string;
  write_date: string;
}

interface OdooResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class OdooService {
  private credentials: OdooCredentials;
  private uid: number | null = null;

  constructor() {
    this.credentials = {
      url: process.env.ODOO_URL || '',
      db: process.env.ODOO_DB || '',
      username: process.env.ODOO_USERNAME || '',
      apiKey: process.env.ODOO_API_KEY || '',
    };
  }

  // Get user ID for API key authentication
  private async getUserId(): Promise<number | null> {
    try {
      // For API key authentication, we need to get the user ID first
      const response = await fetch(`${this.credentials.url}/jsonrpc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'common',
            method: 'version',
            args: []
          },
          id: Math.floor(Math.random() * 1000),
        }),
      });

      const data = await response.json();
      console.log('Odoo version info:', data);
      
      // Try to authenticate with username and API key
      const authResponse = await fetch(`${this.credentials.url}/jsonrpc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'common',
            method: 'authenticate',
            args: [
              this.credentials.db,
              this.credentials.username,
              this.credentials.apiKey,
              {}
            ]
          },
          id: Math.floor(Math.random() * 1000),
        }),
      });

      const authData = await authResponse.json();
      console.log('Auth response:', authData);
      
      if (authData.result && authData.result !== false) {
        this.uid = authData.result;
        return authData.result;
      }
      
      throw new Error(`Authentication failed: ${JSON.stringify(authData.error || authData)}`);
    } catch (error) {
      console.error('Odoo authentication error:', error);
      return null;
    }
  }

  // Make authenticated calls to Odoo
  private async call(model: string, method: string, args: any[] = [], kwargs: any = {}): Promise<OdooResponse> {
    try {
      if (!this.uid) {
        const authResult = await this.getUserId();
        if (!authResult) {
          return { success: false, error: 'Authentication failed' };
        }
      }

      const response = await fetch(`${this.credentials.url}/jsonrpc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service: 'object',
            method: 'execute_kw',
            args: [
              this.credentials.db,
              this.uid,
              this.credentials.apiKey,
              model,
              method,
              args,
              kwargs
            ]
          },
          id: Math.floor(Math.random() * 1000),
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API call failed');
      }

      return { success: true, data: data.result };
    } catch (error) {
      console.error('Odoo API call error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Fetch all active job positions
  async getJobPositions(): Promise<JobPosition[]> {
    try {
      // First, search for active job positions
      const searchResult = await this.call('hr.job', 'search', [
        [['state', '=', 'recruit']] // Only get positions that are actively recruiting
      ]);

      if (!searchResult.success || !searchResult.data) {
        console.error('Failed to search job positions:', searchResult.error);
        return [];
      }

      const jobIds = searchResult.data;

      if (jobIds.length === 0) {
        return [];
      }

      // Then, read the job details
      const readResult = await this.call('hr.job', 'read', [jobIds], {
        fields: [
          'name',
          'description',
          'department_id',
          'location',
          'contract_type',
          'state',
          'no_of_recruitment',
          'application_count',
          'create_date',
          'write_date'
        ]
      });

      if (!readResult.success || !readResult.data) {
        console.error('Failed to read job positions:', readResult.error);
        return [];
      }

      return readResult.data;
    } catch (error) {
      console.error('Error fetching job positions:', error);
      return [];
    }
  }

  // Get a specific job position by ID
  async getJobPosition(id: number): Promise<JobPosition | null> {
    try {
      const result = await this.call('hr.job', 'read', [[id]], {
        fields: [
          'name',
          'description',
          'department_id',
          'location',
          'contract_type',
          'state',
          'no_of_recruitment',
          'application_count',
          'create_date',
          'write_date'
        ]
      });

      if (!result.success || !result.data || result.data.length === 0) {
        return null;
      }

      return result.data[0];
    } catch (error) {
      console.error('Error fetching job position:', error);
      return null;
    }
  }

  // Submit a job application
  async submitApplication(jobId: number, applicantData: {
    name: string;
    email: string;
    phone?: string;
    partner_name?: string;
    description?: string;
  }): Promise<OdooResponse> {
    try {
      const result = await this.call('hr.applicant', 'create', [{
        job_id: jobId,
        partner_name: applicantData.name,
        email_from: applicantData.email,
        partner_phone: applicantData.phone,
        description: applicantData.description,
        stage_id: 1, // Initial stage
      }]);

      return result;
    } catch (error) {
      console.error('Error submitting application:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

export default OdooService;
export type { JobPosition, OdooResponse };