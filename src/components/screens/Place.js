import React, { useState, useEffect, useContext } from "react";
import Header from "../includes/Header";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../../axiosConfig";
import Helmet from "react-helmet";
import { useParams } from "react-router";
import { UserContext } from "../../App";

export default function Place() {
  const { userData } = useContext(UserContext);
  const [place, setPlace] = useState({
    name: "",
    gallery: [],
  });

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/places/protected/${id}`,{
          headers:{
              Authorization: `Bearer ${userData?.access}`
          },
      })
      .then((response) => {
        setPlace(response.data.data);
      })
      .catch((error) => {
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${place.name}`} | Moke Travel</title>
      </Helmet>
      <Header />
      <MainContainer>
        <Title>{place.name}</Title>
        <InfoContainer>
          <CategoryName>{place.category_name}</CategoryName>
          <LocationContainer>
            <LocationIcon
              src={require("../assets/images/place.svg").default}
              alt="Place"
            />
            <LocationName>{place.location}</LocationName>
          </LocationContainer>
        </InfoContainer>
        <GalleryContainer>
          <GalleryImageItem>
            <GalleryImage src={place.image} alt="" />
          </GalleryImageItem>
          {place.gallery.map((item) => (
            <GalleryImageItem>
              <GalleryImage src={item.image} alt="" />
            </GalleryImageItem>
          ))}
        </GalleryContainer>
        <SubHeading>Place Details</SubHeading>
        <Description>{place.description}</Description>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 70%;
  margin: 70px auto 0;
`;
const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 15px;
`;
const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
const CategoryName = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
  border: 1px solid #9c9c9c;
  color: #9c9c9c;
  margin-right: 15px;
`;
const LocationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LocationIcon = styled.img`
  margin-right: 5px;
`;
const LocationName = styled.span`
  color: #9c9c9c;
  font-weight: bold;
  font-size: 14px;
`;
const GalleryContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 35px;
`;
const GalleryImageItem = styled.li`
  &:first-child {
    grid-column-end: span 2;
    grid-row-end: span 2;
  }
`;
const GalleryImage = styled.img`
  width: 100%;
  display: block;
`;
const SubHeading = styled.h3`
  font-size: 28px;
  margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 16px;
  line-height: 1.6em;
`;
