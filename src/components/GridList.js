import React from "react";
import ReactDOM from "react-dom";
import { Card } from "antd";
import StackGrid from "react-stack-grid";

export function GridList({ data }) {
  const { Meta } = Card;
  return (
    <div className="GridContainer">
      <StackGrid columnWidth={350} >
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Card
                hoverable
                cover={<img src={item.imagePath} alt={item.title}></img>}
              >
                <Meta title={item.title} description={item.description} />
              </Card>
            </div>
          );
        })}
      </StackGrid>
    </div>
  );
}
