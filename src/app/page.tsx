import TaskManager from '@/components/TaskManager'
import { UserCreateForm } from '@/components/UserCreateForm'

export default function Home() {
  return <>
    <TaskManager />
    <UserCreateForm />
  </>
}
