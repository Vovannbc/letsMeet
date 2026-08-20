import { useMutation } from "@tanstack/react-query";

import { createMeet, type CreateMeetPayload, type Meet } from "@/api/meets";

export function useCreateMeet() {
  return useMutation<Meet, Error, CreateMeetPayload>({
    mutationFn: createMeet,
  });
}
