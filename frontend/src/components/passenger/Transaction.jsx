import { Card, Table, Badge, Alert } from "react-bootstrap";

const Transaction = () => {
  // Dummy transaction data
  const transactions = [
    {
      id: 1,
      pnr: "PNR123456",
      flightNo: "BA101",
      route: "Mumbai → Delhi",
      date: "2026-03-01",
      amount: 5200,
      mode: "Card",
      status: "Success",
    },
    {
      id: 2,
      pnr: "PNR654321",
      flightNo: "BA202",
      route: "Pune → Goa",
      date: "2026-02-18",
      amount: 4800,
      mode: "UPI",
      status: "Success",
    },
    {
      id: 3,
      pnr: "PNR789012",
      flightNo: "BA303",
      route: "Delhi → Jaipur",
      date: "2026-02-10",
      amount: 4300,
      mode: "Net Banking",
      status: "Failed",
    },
  ];

  const getStatusVariant = (status) =>
    status === "Success" ? "success" : "danger";

  return (
    <>
      {/* PAGE TITLE */}
      <h4 className="fw-bold mb-4">Transaction History</h4>

      <Card className="shadow-sm border-0">
        <Card.Body>
          {transactions.length === 0 ? (
            <Alert variant="info">
              No transactions found.
            </Alert>
          ) : (
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>PNR</th>
                  <th>Flight</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Payment Mode</th>
                  <th>Amount (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={tx.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{tx.pnr}</td>
                    <td>{tx.flightNo}</td>
                    <td>{tx.route}</td>
                    <td>{tx.date}</td>
                    <td>{tx.mode}</td>
                    <td>{tx.amount}</td>
                    <td>
                      <Badge bg={getStatusVariant(tx.status)}>
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Transaction;
