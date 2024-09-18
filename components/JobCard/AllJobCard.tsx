import { Job, Hired } from '@prisma/client'
import JobList from './JobList'
import { useGlobalContext } from '@/Context/store'
import { Alert } from 'antd'
import { JobSwitchProvider } from '@/Context/job-switch-context'

interface IAllJobCard {
  job: (Job & { hired: Hired[] })[]
}

const AccessAlert: React.FC = () => (
  <Alert
    className="mb-2"
    type="info"
    message="Contact admin to grant you access to carry out actions on this page"
    showIcon
  />
)

const AllJobCard: React.FC<IAllJobCard> = ({ job }) => {
  const { access } = useGlobalContext()

  return (
    <JobSwitchProvider>
      {!access && <AccessAlert />}
      <JobList jobs={job} access={access} />
    </JobSwitchProvider>
  )
}

export default AllJobCard
