import React from "react";
import Lottie from "@amelix/react-lottie";
import { successOptions } from "@/utils";
import { Card } from "antd";
import { Popconfirm } from "antd";
import { Modal, Divider } from "antd";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Badge,
  Space,
  Tag,
  message,
  Empty,
} from "antd";
import { useState } from "react";
import TicketService from "@/services/TicketService";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { ticketService } from "@/services/Instances";



export default function TicketView({tickets, setTickets}) {
  const [open, setOpen] = useState(false);

  const unresolvedTickets = tickets.filter(ticket => ticket.status == 'unresolved');
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const removeTicket = async (ticketId) => {
    const response = await ticketService.removeTicket(ticketId);
    console.log(response);
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
  };


  return (
    <div>
    <Divider
      orientation="middle"
      style={{
        textAlign: "left",
        fontFamily: "IBM_Plex_Serif",
        fontSize: "18px",
      }}
    >
      Unresolved Tickets
    </Divider>
    <div
      style={{
        display: "flex",
        overflowX: "scroll",
        // marginLeft: "-8px",
        textAlign: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {!unresolvedTickets.length ? (
        <Empty
          description={
            <p style={{ color: "gray" }}>Saved listings will show here</p>
          }
        />
      ) : 
        unresolvedTickets.map(ticket => (
          <Card
          className="card hover-bg"
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
          
            >
              Status: &nbsp;
              {ticket.status === "resolved" && (
                 <div style={{width: 90}}>
                 <Tag 
                 style={{
                   display: "flex",
                   alignItems: "center",
                   gap: "0.3rem",
                   flexGrow: 0,
                   flexShrink: 0,
                 }} 
                 color="success">
                   <CheckCircleOutlined />
                   resolved
                 </Tag>
                 </div>
              )}
              {ticket.status === "in-progress" && (
                <div style={{width: 110}}>
                <Tag 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  flexGrow: 0,
                  flexShrink: 0,
                }} 
                color="processing">
                  <SyncOutlined spin/>
                  in progress
                </Tag>
              </div>
              )}
              {ticket.status === "unresolved" && (
                <Tag
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                  color="error"
                >
                  <CloseCircleOutlined />
                  unresolved
                </Tag>
              )}
              <Popconfirm
                title="Delete ticket"
                description="Do you wish to delete this ticket?"
                onConfirm={() => removeTicket(ticket.id)}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone />
              </Popconfirm>
            </div>
          }
          bordered={false}
          style={{
            width: 300,

            overflow: "visible",
            wordWrap: "break-word",
            marginRight: 50,
            marginBottom: 10,
            marginLeft: 35,
            textAlign: "left",
            flexShrink: 0
          }}
        >
          &nbsp;
          <h3>
            <strong>Title: </strong>
            {ticket.title}
          </h3>
          <p>
            <strong>Description: </strong>
            {ticket.content}
          </p>
          <p>
            <strong>Admin comments: </strong>
            {ticket.admin_comment
              ? ticket.admin_comment
              : "comments made by admin will be visible here"}
          </p>
        </Card>
        ))
      }
    </div>
  </div>
  )

}