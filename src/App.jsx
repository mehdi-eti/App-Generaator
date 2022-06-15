import { useState, useEffect, useCallback } from "react";
import { Tabs, Button } from "@mantine/core";
import { VscJson } from "react-icons/vsc";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import styled from "@emotion/styled";

import Wrapper from "./components/Wrapper"
import { View } from "./View"
import { Json } from "./Json";
import { Design } from "./Design";
import { Code } from "./Code";
import { Logic } from "./Logic";


const Container = styled.div`
    max-height: 670px !important;
    height: 670px;
`

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const handleChangeTab = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.altKey) {
      if (activeTab === 3) {
        setActiveTab(0)
      } else {
        setActiveTab(activeTab + 1)
      }
    }
  }, [activeTab])

  useEffect(() => {
    document.addEventListener("keydown", handleChangeTab)
    return () => document.removeEventListener("keydown", handleChangeTab)
  }, [handleChangeTab])


  return <Wrapper>
    <Container className="d-flex">
      <div className="col-9 bg-white rounded" id="left-tab-view">
        <Tabs active={activeTab} onTabChange={setActiveTab} style={{ height: 670 }}>
          <Tabs.Tab label="Json" icon={<VscJson />} color="yellow">
            <Json />
          </Tabs.Tab>
          <Tabs.Tab label="Code" icon={<BsCodeSlash />} color="red">
            <Code />
          </Tabs.Tab>
          <Tabs.Tab label="Logic" icon={<VscJson />}>
            <Logic />
          </Tabs.Tab>
          <Tabs.Tab label="Design" icon={<MdOutlineDesignServices />} color="cyan">
            <Design />
          </Tabs.Tab>
        </Tabs>
      </div>
      <View />
    </Container>
  </Wrapper>
}

export default App
