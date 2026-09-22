
export interface ConsumerDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isByGoogle?: boolean;
  isMFAActivated?: boolean;
  usedMFAActivatedAt?: string;
  createdOn: string;
}

