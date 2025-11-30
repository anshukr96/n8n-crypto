import axios, { AxiosError, type AxiosInstance } from 'axios';

// Types
interface SignupData {
  username: string;
  password: string;
}

interface SigninData {
  username: string;
  password: string;
}

interface SignupResponse {
  id: string;
}

interface SigninResponse {
  id: string;
  token: string;
}

type NodeKind = 'ACTION' | 'TRIGGER';

interface WorkflowNode {
  id: string;
  nodeId: string;
  position: { x: number; y: number };
  data: {
    kind: NodeKind;
    metadata: any;
  };
  credentials?: any;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface CreateWorkflowData {
  nodes: WorkflowNode[];
  edges: Edge[];
}

interface WorkflowResponse {
  id: string;
}

interface Workflow {
  _id: string;
  userId: string;
  nodes: WorkflowNode[];
  edges: Edge[];
  createdAt?: string;
  updatedAt?: string;
}

interface Execution {
  _id: string;
  workflowId: string;
  status: string;
  startTime?: string;
  endTime?: string;
}

interface NodeType {
  _id: string;
  type: string;
  name: string;
  description?: string;
}

interface ApiError {
  message: string;
}

class WorkflowApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response) {
          throw new Error(error.response.data.message || 'An error occurred');
        }
        throw error;
      }
    );
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  // Auth endpoints
  async signup(data: SignupData): Promise<SignupResponse> {
    const response = await this.client.post<SignupResponse>('/signup', data);
    return response.data;
  }

  async signin(data: SigninData): Promise<SigninResponse> {
    const response = await this.client.post<SigninResponse>('/signin', data);
    this.setToken(response.data.token);
    return response.data;
  }

  // Workflow endpoints
  async createWorkflow(data: CreateWorkflowData): Promise<WorkflowResponse> {
    const response = await this.client.post<WorkflowResponse>('/workflow', data);
    return response.data;
  }

  async getWorkflows(): Promise<Workflow | Workflow[]> {
    const response = await this.client.get<Workflow | Workflow[]>('/workflows');
    return response.data;
  }

  async getWorkflow(workflowId: string): Promise<Workflow> {
    const response = await this.client.get<Workflow>(`/workflow/${workflowId}`);
    return response.data;
  }

  async getWorkflowExecutions(workflowId: string): Promise<Execution[]> {
    const response = await this.client.get<Execution[]>(
      `/workflow/executions/${workflowId}`
    );
    return response.data;
  }

  // Credentials endpoints (to be implemented)
  async getCredentials(): Promise<any> {
    const response = await this.client.get('/credentials');
    return response.data;
  }

  async createCredential(data: any): Promise<any> {
    const response = await this.client.post('/credentials', data);
    return response.data;
  }

  // Nodes endpoints
  async getNodes(): Promise<NodeType[]> {
    const response = await this.client.get<NodeType[]>('/nodes');
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new WorkflowApiClient();

export type { CreateWorkflowData, Edge, Execution, Workflow, WorkflowNode };

