import * as React from "react";

export type TPostModel = {
  id: number;
  text: string;
};

export type TPostParams = {
  post: TPostModel;
};

export const Post = ({ post }: TPostParams) => {
  return (
    <div>
      {post.id} {post.text}
    </div>
  );
};
