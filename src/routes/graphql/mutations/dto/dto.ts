export interface ProfileDto {
  userId: string;
  memberTypeId: string;
  yearOfBirth: number;
  isMale: boolean;
}

export interface UserDto {
  balance: number;
  name: string;
}

export interface PostDto {
  authorId?: string;
  content: string;
  title: string;
}

