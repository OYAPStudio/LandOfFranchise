import * as xmlrpc from 'xmlrpc';

// Define the Job interface directly since we need it
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export class SimpleOdooService {
  private baseUrl: string;
  private db: string;
  private username: string;
  private password: string; // Changed from apiKey to password
  private uid: number | null = null;

  constructor() {
    this.baseUrl = process.env.ODOO_URL || '';
    this.db = process.env.ODOO_DB || '';
    this.username = process.env.ODOO_USERNAME || '';
    this.password = process.env.ODOO_API_KEY || ''; // API key is used as password
  }

  private async authenticate(): Promise<number> {
    if (this.uid) return this.uid;

    return new Promise((resolve, reject) => {
      // Extract host and port from URL
      const url = new URL(this.baseUrl);
      const host = url.hostname;
      const port = url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80);
      const secure = url.protocol === 'https:';

      console.log('Connecting to Odoo:', { host, port, secure, baseUrl: this.baseUrl });

      const client = xmlrpc.createClient({
        host,
        port,
        path: '/odoo/xmlrpc/2/common', // Updated path based on our testing
        ...(secure && { secureProtocol: 'TLSv1_2_method' })
      });

      client.methodCall('authenticate', [
        this.db,
        this.username,
        this.password,
        {}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ], (error: any, value: any) => {
        if (error) {
          console.error('Authentication error details:', {
            message: error.message,
            code: error.code,
            faultCode: error.faultCode,
            faultString: error.faultString
          });
          reject(error);
          return;
        }

        if (value && typeof value === 'number' && value > 0) {
          this.uid = value;
          console.log('Authentication successful, UID:', value);
          resolve(value);
        } else {
          console.log('Authentication response:', value);
          reject(new Error('Authentication failed - invalid UID'));
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async executeKw(model: string, method: string, args: any[] = [], kwargs: any = {}): Promise<any> {
    const uid = await this.authenticate();

    return new Promise((resolve, reject) => {
      const url = new URL(this.baseUrl);
      const host = url.hostname;
      const port = url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80);
      const secure = url.protocol === 'https:';

      const client = xmlrpc.createClient({
        host,
        port,
        path: '/odoo/xmlrpc/2/object', // Updated path
        ...(secure && { secureProtocol: 'TLSv1_2_method' })
      });

      client.methodCall('execute_kw', [
        this.db,
        uid,
        this.password,
        model,
        method,
        args,
        kwargs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ], (error: any, value: any) => {
        if (error) {
          console.error('Execute error:', error);
          reject(error);
          return;
        }

        resolve(value);
      });
    });
  }

  async getJobPositions(): Promise<Job[]> {
    try {
      console.log('Fetching jobs from Odoo...');
      
      const jobs = await this.executeKw('hr.job', 'search_read', [
        [['is_published', '=', true]], // domain - only published jobs
        ['name', 'description', 'department_id', 'contract_type_id', 'address_id'] // fields to fetch
      ]);

      console.log('Raw job data from Odoo:', jobs);

      if (Array.isArray(jobs)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return jobs.map((job: any, index: number) => ({
          id: job.id || index + 1,
          title: job.name || 'Untitled Position',
          department: job.department_id ? job.department_id[1] : 'General',
          location: job.address_id ? job.address_id[1] : 'Not specified',
          type: job.contract_type_id ? job.contract_type_id[1] : 'Full-time',
          description: job.description || 'No description available',
          requirements: [], // Odoo doesn't have requirements field by default
          postedDate: new Date().toISOString().split('T')[0] // Use current date as fallback
        }));
      }

      console.log('No jobs found or invalid response');
      return [];
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      return [];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async testConnection(): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
      console.log('Testing Odoo authentication...');
      const uid = await this.authenticate();
      console.log('Authentication successful with UID:', uid);
      return {
        success: true,
        data: { uid, message: 'Connection successful' }
      };
    } catch (error) {
      console.error('Authentication failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const simpleOdooService = new SimpleOdooService();