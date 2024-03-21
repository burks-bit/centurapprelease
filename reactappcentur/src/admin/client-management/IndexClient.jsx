import react from "react";
import Layout from "../../layout/Layout";
import { apiUrl } from "../../services/BackendAPIUrl";

export default function IndexClient() {

    console.log(apiUrl);

    return (
        <Layout>
            <div>
                <h1>Clients Management</h1>
            </div>
        </Layout>
    )
}