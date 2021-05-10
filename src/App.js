import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Card, Col, Layout, Modal, Pagination, Row, Spin } from "antd";
import { fetchData } from "./api";
import ModalContent from "./ModalContent";
import Pokeball from "./pokeball.png";
import { getTitle } from "./utils";

const { Content, Header } = Layout;

function App() {
  const [appState, setAppState] = useState({
    showModal: false,
    modalId: null,
    loading: true,
    pId: null,
    error: false,
  });

  const [filters, setFilters] = useState({
    limit: 20,
    offset: 0,
  });

  const [state, setState] = useState({});

  useEffect(() => {
    setAppState({ ...appState, loading: true });
    async function init() {
      const data = await fetchData(filters);
      setState(data);
      setAppState({ ...appState, loading: false });
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="container">
      <Layout>
        <Header className="appHeader">
          <div className="appTitle">PokeDex</div>
        </Header>
        <Spin spinning={appState?.loading}>
          <Content style={{ padding: 24 }}>
            <Row gutter={16}>
              {state?.results?.map((item, idx) => {
                const { name, url } = item;
                const currIdx = idx + 1 + filters?.offset;
                return (
                  <Col span={6} key={url}>
                    <Card
                      onClick={() =>
                        setAppState({
                          ...appState,
                          modalId: currIdx,
                          showModal: true,
                          pId: idx,
                        })
                      }
                      hoverable
                      cover={
                        <img
                          style={{
                            padding: 12,
                            width: 96,
                            margin: "auto",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Pokeball;
                          }}
                          alt={`${name} `}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${currIdx}.png`}
                        />
                      }
                    >
                      <Card.Meta title={name} />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Content>
          <Row
            style={{
              padding: 24,
              background: "#dedede",
              justifyContent: "center",
            }}
          >
            <Pagination
              size="small"
              total={state?.count}
              pageSize={filters?.limit}
              current={filters.offset / filters.limit + 1}
              onChange={(page, pageSize) => {
                setFilters({
                  ...filters,
                  limit: pageSize,
                  offset: (page - 1) * pageSize,
                });
              }}
            />
          </Row>
        </Spin>
      </Layout>
      {appState?.modalId !== null && (
        <Modal
          visible={appState?.modalId !== null}
          onCancel={() =>
            setAppState({ ...appState, modalId: null, showModal: false })
          }
          centered
          closable={true}
          footer={null}
          title={getTitle(appState?.pId, state?.results)}
        >
          <ModalContent idx={appState?.modalId} />
        </Modal>
      )}
    </div>
  );
}

export default App;
