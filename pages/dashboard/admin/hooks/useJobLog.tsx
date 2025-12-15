import { useQuery } from '@tanstack/react-query'
import { Tag, Button, Space, Tooltip } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Axios } from '@/request/request'

interface JobLogData {
  job_id: string
  job_title: string
  job_exp: string
  job_no_hires: string
  job_qual: string
  job_resumption: Date
  job_min_sal: string
  job_max_sal: string
  active: boolean
  status: boolean
  createdAt: Date
  updatedAt: Date
  school: {
    sch_id: string
    sch_name: string
    sch_verified: number
  }
  user: {
    id: string
    fname: string
    lname: string
  }
  applied: Array<{ id: string }>
  isVisible: boolean
  deadline: Date
  applicationCount: number
  schoolStatus: string
}

const useJobLog = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-job-log'],
    queryFn: async (): Promise<JobLogData[]> => {
      try {
        console.log('Fetching job log data...')
        const response = await Axios.get('/job/admin/log')
        console.log('Full API Response:', response)
        console.log('Response data:', response.data)
        console.log('Jobs array:', response.data.jobs)
        console.log('Jobs count:', response.data.jobs?.length || 0)
        
        if (!response.data.jobs || !Array.isArray(response.data.jobs)) {
          console.warn('Jobs data is not an array:', response.data.jobs)
          return []
        }
        
        return response.data.jobs
      } catch (error) {
        console.error('Error fetching job log:', error)
        if ((error as any).response) {
          console.error('Error response:', (error as any).response.data)
          console.error('Error status:', (error as any).response.status)
        }
        throw error
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      width: 200,
      render: (text: string) => (
        <div className="font-medium text-gray-900 truncate" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'job_exp',
      key: 'job_exp',
      width: 120,
      render: (exp: string) => (
        <span className="text-green-600 font-medium">{exp}</span>
      ),
    },
    {
      title: 'Vacancy',
      dataIndex: 'job_no_hires',
      key: 'job_no_hires',
      width: 100,
      render: (vacancy: string) => (
        <span className="text-blue-600 font-medium">{vacancy}</span>
      ),
    },
    {
      title: 'Qualification',
      dataIndex: 'job_qual',
      key: 'job_qual',
      width: 130,
      render: (qual: string) => (
        <span className="text-purple-600 font-medium">{qual}</span>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
      render: (date: string) => (
        <span className="text-red-600 font-medium">
          {format(new Date(date), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      title: 'School',
      dataIndex: ['school', 'sch_name'],
      key: 'school_name',
      width: 180,
      render: (text: string, record: JobLogData) => (
        <div>
          <div className="font-medium text-gray-900 truncate" title={text}>
            {text}
          </div>
          <Tag 
            color={record.schoolStatus === 'Approved' ? 'green' : 'orange'}
          >
            {record.schoolStatus}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (date: string) => (
        <div className="text-sm">
          <div>{format(new Date(date), 'MMM dd, yyyy')}</div>
          <div className="text-gray-500">
            {format(new Date(date), 'HH:mm')}
          </div>
        </div>
      ),
    },
    {
      title: 'Applications',
      dataIndex: 'applicationCount',
      key: 'applicationCount',
      width: 100,
      render: (count: number) => (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
          {count}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (record: JobLogData) => {
        const isVisible = record.isVisible
        const tooltipText = isVisible 
          ? 'Job is visible on the public job page' 
          : 'Job is hidden from public view (inactive, not approved, or school not verified)'
        
        return (
          <Tooltip title={tooltipText}>
            <Tag 
              icon={isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              color={isVisible ? 'green' : 'red'}
            >
              {isVisible ? 'Visible' : 'Hidden'}
            </Tag>
          </Tooltip>
        )
      },
    },
    {
      title: 'Salary Range',
      key: 'salary',
      width: 150,
      render: (record: JobLogData) => (
        <div className="text-sm font-medium text-gray-900">
          ₦{parseInt(record.job_min_sal).toLocaleString()} - ₦{parseInt(record.job_max_sal).toLocaleString()}
        </div>
      ),
    },
  ]

  return {
    jobs: data || [],
    columns,
    isLoading,
    error,
    refetch,
  }
}

export default useJobLog