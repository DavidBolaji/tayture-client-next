import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useJeloGroup = () => {
  const queryClient = useQueryClient()
  const school = queryClient.getQueryData(['school']) as unknown as any
  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      // replace with API call
      const res = await fetch(`/api/group?orgId=${school?.sch_id}`)
      if (!res.ok) throw new Error('Failed to fetch groups')
        const data = await res.json();
      return data.group
    }
  })

  const addGroupMutation = useMutation({
    mutationFn: async (newGroup: { name: string }) => {
      // replace with API call
      const res = await fetch(`/api/group/create?orgId=${school?.sch_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup),
      })
      if (!res.ok) throw new Error('Failed to create group');
      const data = await res.json();
      return data.group
    },
    onSuccess: (newGroup) => {
      queryClient.setQueryData(['groups'], (old: any) => [...(old || []), newGroup])
    }
  })

  return { groups, isLoading, addGroup: addGroupMutation.mutateAsync }
}