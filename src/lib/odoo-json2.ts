// JSON-2 API service for Odoo
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

export // Types for Odoo API responses
interface OdooFieldInfo {
  string: string;
  type: string;
  required: boolean;
  help?: string;
}

interface OdooFieldsResponse {
  [fieldName: string]: OdooFieldInfo;
}

interface OdooJobRecord {
  id: number;
  name: string;
  description?: string;
  department_id?: [number, string];
  company_id?: [number, string];
  address_id?: [number, string];
  contract_type_id?: [number, string];
  requirements?: string;
  create_date?: string;
  is_published?: boolean;
  state?: string;
}

class OdooJson2Service {
  private baseUrl: string;
  private db: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.ODOO_URL || '';
    this.db = process.env.ODOO_DB || '';
    this.apiKey = process.env.ODOO_API_KEY || '';
  }

  private async makeRequest(model: string, method: string, body: Record<string, unknown>): Promise<unknown> {
    const url = `${this.baseUrl}/json/2/${model}/${method}`;
    
    console.log('Making JSON-2 API request:', { url, model, method });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${this.apiKey}`,
        'Content-Type': 'application/json; charset=utf-8',
        'X-Odoo-Database': this.db,
        'User-Agent': 'LandOfFranchise-Website/1.0'
      },
      body: JSON.stringify(body)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  }

  async getJobPositions(): Promise<Job[]> {
    try {
      console.log('Fetching jobs using JSON-2 API...');
      
      // Get jobs using only fields that exist
      const jobs = await this.makeRequest('hr.job', 'search_read', {
        context: { lang: 'en_US' },
        domain: [['active', '=', true]], // Use active field to filter
        fields: ['name', 'description', 'requirements', 'department_id', 'contract_type_id', 'address_id', 'create_date'],
        limit: 10
      });

      console.log('Raw job data from Odoo JSON-2:', jobs);

      if (Array.isArray(jobs)) {
        return jobs.map((job: OdooJobRecord, index: number) => ({
          id: job.id || index + 1,
          title: job.name || 'Untitled Position',
          department: job.department_id ? job.department_id[1] : 'General',
          location: job.address_id ? job.address_id[1] : 'Not specified',
          type: job.contract_type_id ? job.contract_type_id[1] : 'Full-time',
          description: job.description || 'No description available',
          requirements: job.requirements ? job.requirements.split('\n').filter(Boolean) : [],
          postedDate: job.create_date ? job.create_date.split(' ')[0] : new Date().toISOString().split('T')[0]
        }));
      }

      return [];
    } catch (error) {
      console.error('Failed to fetch jobs via JSON-2 API:', error);
      throw error;
    }
  }

  async getApplicantFields(): Promise<OdooFieldsResponse> {
    try {
      console.log('Checking hr.applicant fields...');
      const fieldsInfo = await this.makeRequest('hr.applicant', 'fields_get', {
        context: { lang: 'en_US' },
        attributes: ['string', 'type', 'required', 'help']
      }) as OdooFieldsResponse;
      
      console.log('Available hr.applicant fields:', Object.keys(fieldsInfo));
      return fieldsInfo;
    } catch (error) {
      console.error('Failed to fetch applicant fields:', error);
      throw error;
    }
  }

    async createJobApplication(applicationData: {
    jobId: number;
    name: string;
    email: string;
    phone?: string;
    coverLetter?: string;
    experience?: string;
    cv?: string; // Base64 encoded CV file
  }): Promise<{ success: boolean; data?: OdooJobRecord; error?: string }> {
    try {
      console.log('Creating job application:', applicationData);
      
      const applicantData = {
        partner_name: applicationData.name,
        email_from: applicationData.email,
        partner_phone: applicationData.phone || '',
        job_id: applicationData.jobId,
        applicant_notes: `
          ${applicationData.coverLetter ? `Cover Letter: ${applicationData.coverLetter}\n\n` : ''}
          ${applicationData.experience ? `Experience: ${applicationData.experience}` : ''}
        `.trim(),
        attachment_ids: applicationData.cv ? [[0, 0, {
          'name': 'CV.pdf',
          'type': 'binary',
          'datas': applicationData.cv,
          'res_model': 'hr.applicant',
          'mimetype': 'application/pdf'
        }]] : false
      };

      const result = await this.makeRequest('hr.applicant', 'create', {
        vals_list: [applicantData],
        context: { lang: 'en_US' }
      });

      console.log('Application created successfully:', result);
      
      return {
        success: true,
        data: result as OdooJobRecord
      };
    } catch (error) {
      console.error('Failed to create job application:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async testConnection(): Promise<{ success: boolean; error?: string; data?: { message: string; result: unknown } }> {
    try {
      console.log('Testing JSON-2 API connection...');
      
      // Test with a simple search on res.users to get current user
      const result = await this.makeRequest('res.users', 'context_get', {
        context: { lang: 'en_US' }
      });
      
      console.log('Connection test successful:', result);
      return {
        success: true,
        data: { message: 'JSON-2 API connection successful', result }
      };
    } catch (error) {
      console.error('JSON-2 API connection failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const odooJson2Service = new OdooJson2Service();