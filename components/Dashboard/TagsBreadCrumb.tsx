import styled from '@emotion/styled'
import { Breadcrumb } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { FiBriefcase, FiHome } from 'react-icons/fi'

const StyledBreadcrumb = styled(Breadcrumb)`
  svg {
    margin-top: 5px;
  }
  .ant-breadcrumb-link div {
    margin-top: 3px !important;
  }
`

function TagsBreadCrumb() {
  const router = useRouter()
  const pathname = usePathname()
  // const { jobId } = useParams();
  return (
    <div className="dsm:mt-0 mt-5">
      {pathname === '/dashboard/jobs/profile' && (
        <div className="translate-y-20 px-[48px]">
          <StyledBreadcrumb
            separator=">"
            items={[
              {
                title: (
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <FiBriefcase />
                  </div>
                ),
              },
              {
                title: (
                  <div className="text-orange text-[12px]">Job Profile</div>
                ),
              },
            ]}
          />
        </div>
      )}
      {pathname === '/dashboard/jobs/all' && (
        <div className="translate-y-20 px-[48px]">
          <StyledBreadcrumb
            separator=">"
            items={[
              {
                title: (
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <FiBriefcase />
                  </div>
                ),
              },
              {
                title: <div className="text-orange text-[12px]">My Job</div>,
              },
            ]}
          />
        </div>
      )}
      {pathname === '/dashboard/school/new' && (
        <div className="translate-y-20 px-[48px]">
          <StyledBreadcrumb
            separator=">"
            items={[
              {
                title: (
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <FiHome />
                  </div>
                ),
              },
              {
                title: (
                  <div className="text-orange text-[12px]">Add School </div>
                ),
              },
            ]}
          />
        </div>
      )}
      {/* {pathname === `/dashboard/school/manage/${jobId}` && (
        <div className="translate-y-20 px-[48px]">
          <StyledBreadcrumb
            separator=">"
            items={[
              {
                title: (
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <FiBriefcase />
                  </div>
                ),
              },
              {
                title: (
                  <div className="text-orange text-[12px]"> Manage jobs </div>
                ),
              },
            ]}
          />
        </div>
      )} */}
      {pathname === '/dashboard/school/post' && (
        <div className="translate-y-20 px-[48px]">
          <StyledBreadcrumb
            separator=">"
            items={[
              {
                title: (
                  <div className="cursor-pointer" onClick={() => router.back()}>
                    <FiBriefcase />
                  </div>
                ),
              },
              {
                title: <div className="text-orange text-[12px]">Post Job </div>,
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default TagsBreadCrumb
