import React from "react";
import Layout from "../Components/Layout";
import styled from "styled-components";

const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const BackLink = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s ease;

  &:hover {
    color: #004080;
  }
`;

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <PageNotFoundContainer>
        <Heading>404</Heading>
        <Message>Page Not Found</Message>
        <BackLink href="/">Go Back Home</BackLink>
      </PageNotFoundContainer>
    </Layout>
  );
};

export default PageNotFound;
