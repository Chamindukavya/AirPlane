import React from "react";

type Ticket = {
  ticket_id: number;
  name: string;
  seat_id: string;
  class: string;
  age: number;
  booking_flight_id: number;
  start_time: string;
  end_time: string;
  aircraft_id: string;
  date: string;
  origin_airport: string;
  destination_airport: string;
};

type TicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
};

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  ticket,
}) => {
  console.log(ticket, "typidfghjk");
  if (!isOpen || !ticket) {
    return null; // If modal is not open or no ticket is selected, don't render
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
      }}
    >
      <div
        style={{
          background: "linear-gradient(to bottom right, skyblue, black)", // Gradient background for the card
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Soft shadow for a floating effect
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
            Ticket {ticket.ticket_id}
          </h2>
        </div>

        {/* Modal Content (Ticket Details) */}
        <div style={{ display: "grid", gap: "16px" }}>
          {/* Two parallel answer boxes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two columns for parallel boxes
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Light ash box with transparency
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#333",
                }}
              >
                Name:
              </p>
              <p>{ticket.name}</p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Light ash box with transparency
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#333",
                }}
              >
                ticket_id:
              </p>
              <p>{ticket.ticket_id}</p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Light ash box
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#333",
                }}
              >
                Date:
              </p>
              <p>{ticket.date}</p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two columns for parallel boxes
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#333",
                }}
              >
                Start Time:
              </p>
              <p>{ticket.start_time}</p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#333",
                }}
              >
                Aircraft ID:
              </p>
              <p>{ticket.aircraft_id}</p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two columns for parallel boxes
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#333",
                }}
              >
                Origin Airport:
              </p>
              <p>{ticket.origin_airport}</p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#333",
                }}
              >
                Destination Airport:
              </p>
              <p>{ticket.destination_airport}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#4d90ff", // Modern blue button
              color: "#fff",
              padding: "10px 16px",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
