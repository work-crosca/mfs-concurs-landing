import React, { useEffect, useState } from "react";
import TopBar from "./UI/TopBar";
import Loading from "./UI/Loading";
import CategoryChart from "./UI/CategoryChart";
import "../styles/AdminDashboard.css";

const TABS = [
  { key: "all", label: "Toate" },
  { key: "verified", label: "Verificate" },
  { key: "pending", label: "În așteptare" },
];

const LIMIT = 9;
const API_URL = import.meta.env.VITE_APP_API_URL;

export default function AdminDashboard() {
  const [tab, setTab] = useState("pending");
  const [uploads, setUploads] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchUploads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (tab !== "all") params.append("filter", tab);
      params.append("page", page);
      params.append("limit", LIMIT);

      const res = await fetch(
        `${API_URL}/api/admin/uploads?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setUploads(data.uploads || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const approveImage = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/uploads/${id}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUploads();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const deleteImage = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/uploads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUploads();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, [tab, page]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="admin-dashboard">
      <TopBar />

      <div className="admin-dashboard-inner">
        <h2 className="admin-title">Imagini</h2>

        <div className="admin-tabs">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setPage(1);
              }}
              className={`admin-tab ${tab === key ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        <CategoryChart filter={tab} />

        {loading ? (
          <Loading />
        ) : uploads.length === 0 ? (
          <p className="admin-empty">Nicio imagine găsită.</p>
        ) : (
          <div className="admin-grid">
            {uploads.map((img) => (
              <div key={img._id} className="admin-card">
                <div className="admin-card-content">
                  <img
                    src={img.fileUrl}
                    alt={img.description}
                    className="admin-image"
                  />
                  <p>
                    <strong>{img.nickname}</strong> — {img.category}
                  </p>
                  <p className="admin-description">{img.description}</p>
                </div>
                <div className="admin-buttons">
                  {img.isVerified ? (
                    <span className="verified-label">Verificat</span>
                  ) : (
                    <button
                      className="btn approve"
                      onClick={() => approveImage(img._id)}
                    >
                      Aprobă
                    </button>
                  )}
                  <button
                    className="btn delete"
                    onClick={() => deleteImage(img._id)}
                  >
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="admin-pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`page-btn ${page === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
