declare interface Board {
  id: number,
  username: string,
  title: string,
  content: string,
  createdDate: string,
  updatedDate?: string,
}

declare interface BoardBody {
  title?: string,
  content?: string
}