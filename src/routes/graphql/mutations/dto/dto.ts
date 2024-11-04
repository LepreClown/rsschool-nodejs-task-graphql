export interface UserDto {
  name: string;
  balance: number;
}

export interface PostDto {
  title: string;
  content: string;
}

export interface CreatePostDto extends PostDto {
  authorId: string;
}

export interface ProfileDto {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
}
