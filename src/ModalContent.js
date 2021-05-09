import { Alert, Descriptions, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { fetchSinglePokemonData } from "./api";
import { filterData } from "./utils";

const ModalContent = ({ idx }) => {
  const [appState, setAppState] = useState({ loading: true, error: false });
  const [state, setState] = useState({});

  useEffect(() => {
    async function init() {
      const data = await fetchSinglePokemonData(idx);
      if (data) {
        setState(filterData(data));
        setAppState({ ...appState, loading: false });
      } else {
        setAppState({
          loading: false,
          error: true,
        });
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <Spin spinning={appState?.loading}>
      {!appState?.error && (
        <Descriptions bordered>
          <Descriptions.Item span={3} label="Types">
            {state?.types?.map((item) => (
              <Tag key={`feat-type-${item?.slot}`} title={item?.type?.name}>
                {item?.type?.name}
              </Tag>
            ))}
          </Descriptions.Item>

          <Descriptions.Item span={3} label="Abilities">
            {state?.abilities?.map((item) => (
              <Tag
                key={`feat-ability-${item?.slot}`}
                title={item?.ability?.name}
              >
                {item?.ability?.name}
              </Tag>
            ))}
          </Descriptions.Item>

          {state?.heldItems?.length > 0 && (
            <Descriptions.Item span={3} label="Held Items">
              {state?.heldItems?.map((item, idx) => (
                <Tag key={`feat-held-items-${idx}`} title={item?.item?.name}>
                  {item?.item?.name}
                </Tag>
              ))}
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
      {appState?.error && <Alert message="No data found" type="error" />}
    </Spin>
  );
};

export default ModalContent;
