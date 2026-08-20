const API_BASE_URL = "http://192.168.31.194:5001/api/meets";

export interface CreateMeetPayload {
  category: string;
  eventName: string;
  description: string;
  time: Date | null;
  people: number;
}

export interface Meet extends CreateMeetPayload {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export async function createMeet(payload: CreateMeetPayload): Promise<Meet> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log(response);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    console.log(error);
    throw new Error(
      error.error ?? `Request failed with status ${response.status}`,
    );
  }

  return response.json();
}

export const getMeets = async (): Promise<Meet[]> => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    console.log(error);
    throw new Error(
      error.error ?? `Request failed with status ${response.status}`,
    );
  }

  return response.json();
};
