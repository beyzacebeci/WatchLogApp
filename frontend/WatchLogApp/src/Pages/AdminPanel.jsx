import React, { useContext, useEffect, useState } from "react";
import { Nav, Tab, Row, Col, Button } from "react-bootstrap";
import MoviesContext from "../context/movie";
import TvShowsContext from "../context/tvshow";
import { useNavigate } from "react-router-dom";
import MoviesTable from "../Components/MoviesTable";
import TvShowsTable from "../Components/TvShowsTable";

function AdminPanel() {
  const navigate = useNavigate();

  const handleAddMovie = () => {
    navigate(`/add-movie`);
  };
  const handleAddTvShow = () => {
    navigate(`/add-tvshow`);
  };

  return (
    <div className="container mt-5">
      <Tab.Container defaultActiveKey="movies">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="movies">Movies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tvShows">TV Series</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="movies">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="dark"
                    color="primary"
                    onClick={() => handleAddMovie()}
                  >
                    +
                  </Button>
                </div>
                <MoviesTable></MoviesTable>
              </Tab.Pane>
              <Tab.Pane eventKey="tvShows">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="dark"
                    color="primary"
                    onClick={() => handleAddTvShow()}
                  >
                    +
                  </Button>
                </div>
                <TvShowsTable></TvShowsTable>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default AdminPanel;
