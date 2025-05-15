import { useContext } from "react";
import { Card, Button } from "antd";
import { feedKnowledgeJSONToFirebase } from "../actions"
import { StoreContext } from "../store";

export default function Feeder() {
    const { state: { feedProducts: { loading } }, dispatch } = useContext(StoreContext);

    return (
        <div className="feed">
            <Card className="feed-item feed-knowledge">
                <div className="feed-__content">
                    <h2 className="feed-item__name">Feed Knowledge JSON data to FireStore</h2>
                </div>
                {loading
                    ? (
                        <Button
                            className="cart-modal-btn"
                            type="primary"
                            onClick={() => feedKnowledgeJSONToFirebase(dispatch)}
                            loading
                        >
                            <span style={{ marginLeft: 12 }}>Feed</span>
                        </Button>
                    ) : (
                        <Button
                            className="cart-modal-btn"
                            type="primary"
                            onClick={() => feedKnowledgeJSONToFirebase(dispatch)}
                        >
                            <span style={{ marginLeft: 12 }}>Feed</span>
                        </Button>
                    )}
            </Card>
        </div>
    );
}