import { Card, Table, Badge, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "../redux/slices/transactionSlice";

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading transactions...</p>
      </div>
    );
  }

  return (
    <>
      <h4 className="fw-bold mb-4">Transaction History</h4>

      {transactions.length === 0 ? (
        <Card className="shadow-sm border-0">
          <Card.Body className="text-center py-5">
            <p className="text-muted">No transactions found</p>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Route</th>
                  <th>Flight</th>
                  <th>PNR</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td className="fw-semibold">{transaction.transactionNumber}</td>
                    <td>
                      {new Date(transaction.transactionDate).toLocaleDateString()} <br />
                      <small className="text-muted">
                        {new Date(transaction.transactionDate).toLocaleTimeString()}
                      </small>
                    </td>
                    <td>
                      <Badge
                        bg={
                          transaction.type === "BOOKING_PAYMENT"
                            ? "primary"
                            : transaction.type === "REFUND"
                            ? "success"
                            : "warning"
                        }
                      >
                        {transaction.type.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td>
                      {transaction.booking?.flight?.route?.sourceAirport?.city} → {transaction.booking?.flight?.route?.destinationAirport?.city}
                    </td>
                    <td>{transaction.booking?.flight?.flightNumber || 'N/A'}</td>
                    <td>{transaction.booking?.pnr || 'N/A'}</td>
                    <td>
                      <span className={transaction.type === "REFUND" ? "text-success" : "text-danger"}>
                        {transaction.type === "REFUND" ? "+" : "-"}₹ {transaction.amount}
                      </span>
                    </td>
                    <td>{transaction.paymentMethod}</td>
                    <td>
                      <Badge
                        bg={
                          transaction.status === "COMPLETED"
                            ? "success"
                            : transaction.status === "PENDING"
                            ? "warning"
                            : transaction.status === "FAILED"
                            ? "danger"
                            : "info"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td>
                      <small className="text-muted">{transaction.description}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default TransactionHistory;