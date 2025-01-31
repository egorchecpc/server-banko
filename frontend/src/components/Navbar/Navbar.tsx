import { Link, useRouter } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FC } from 'react'
import { useReportId } from '@/context/ReportIdContext'
import { motion } from 'framer-motion'

export interface NavbarProps {
  navItems: { [key: string]: string }
}

export const Navbar: FC<NavbarProps> = ({ navItems }) => {
  const router = useRouter()
  const currentPath = router.state.location.pathname.split('/').pop() || ''
  const { reportId } = useReportId()

  return (
    <nav className="w-[34rem] transition-all duration-300 ease-in-out">
      <Tabs defaultValue={currentPath} className="w-full">
        <TabsList className="flex-start w-full">
          {Object.entries(navItems).map(([key, value]) => (
            <Link
              to={`/reports/${reportId}/${key}`}
              key={key}
              className="w-full"
            >
              <TabsTrigger value={key}>
                <motion.span
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.1 }}
                >
                  {value}
                </motion.span>
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  )
}
