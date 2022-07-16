import React from "react"
import { NextPage } from "next"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import { PostProps } from "../components/Post"
import prisma from '../lib/prisma';

type User = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)) },
  };
}

type Props = {
  feed: User[]
}

const Blog: NextPage<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
