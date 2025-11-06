import React, { useEffect, useMemo, useState, useCallback } from "react";
import api from "@/axios";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  BicepsFlexed,
  Building2Icon,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// --- Config ---
const BRAND_COLOR = "#F24423";
const ACCENT_COLOR = "#FF8800";
const BG_PALE = "#ffe7c2";

// --- Classes ---
const neobrutal = {
  card: "bg-white border-black border-[3px] rounded-2xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6",
  input: "border-2 border-black rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 text-lg font-bold focus:outline-none",
  table: "bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-lg",
  head: "bg-[#ececec] border-b-2 border-black font-bold text-black px-4 py-2 text-base",
  cell: "border-b-2 border-black px-4 py-2 text-base",
  status: {
    active: "bg-[#abff2e] border-2 border-black text-black",
    expired: "bg-[#ffd7e5] border-2 border-black text-black",
    default: "bg-[#e0e0e0] border-2 border-black text-black",
  },
};

const getStatusClass = (status) => {
  if (status === "active") return neobrutal.status.active;
  if (status === "expired") return neobrutal.status.expired;
  return neobrutal.status.default;
};

const getLinkClass = (path, currentPath) => {
  const isActive = currentPath === path;
  return `flex items-center p-3 text-base font-medium transition-colors duration-150 group border-2 border-transparent 
          ${
            isActive
              ? `bg-[${BRAND_COLOR}] text-white shadow-md border-black`
              : "text-gray-700 hover:bg-gray-100 hover:text-black"
          }`;
};

const TrainerMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/user");
      setMembers(response.data || []);
      setErrorMsg("");
    } catch (error) {
      const serverMsg = error.response?.data?.message;
      console.error("Error fetching members:", error);
      toast.error(serverMsg || "Failed to fetch members");
      setErrorMsg(serverMsg || "Failed to fetch members");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const filtered = useMemo(() => {
    const lower = search.trim().toLowerCase();
    if (!lower) return members;
    return members.filter(
      (m) =>
        m.full_name?.toLowerCase().includes(lower) ||
        m.email?.toLowerCase().includes(lower) ||
        m.phone?.toLowerCase().includes(lower)
    );
  }, [search, members]);

  const DesktopSidebar = (
      <aside className="hidden md:block w-64 text-gray-800 shadow-2xl p-4 bg-white border-r sticky top-0 h-screen">
        <div className="flex items-center justify-center h-16 border-b mb-6">
          <Link
            to="/trainer"
            className={`text-2xl font-extrabold text-[${BRAND_COLOR}]`}
          >
            Trainer Panel
          </Link>
        </div>
        <nav className="flex flex-col space-y-1">
          <Link to="/trainer/members" className={getLinkClass("/trainer/members", currentPath)}>
            <Users className={`w-5 h-5 mr-3 ${currentPath === "/trainer/members" ? "text-white" : "text-gray-600 "}`} />
            Members
          </Link>
          <Link to="/trainer/classes" className={getLinkClass("/trainer/classes", currentPath)}>
            <Building2Icon className="w-5 h-5 mr-3" />
            Classes
          </Link>
        </nav>
      </aside>
    );

  // --- Main Layout ---
  return (
    <div
      className="w-full min-h-screen flex flex-row items-start justify-center pt-10"
    >
      {DesktopSidebar}
      <main className="flex-1 flex justify-center">
        <Card className={`${neobrutal.card} w-full md:w-[80%] mx-auto mb-10`}>
          <CardHeader>
            <CardTitle
              className="text-3xl font-extrabold tracking-tight"
              style={{ color: ACCENT_COLOR, textShadow: "2px 2px 0 black" }}
            >
              All Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <Input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={neobrutal.input}
                style={{ width: 300 }}
                aria-label="Search members"
              />
            </div>
            {errorMsg && (
              <div className="my-4 p-4 border-2 border-red-500 bg-red-100 text-red-700 rounded-lg font-bold text-center">
                {errorMsg}
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="animate-spin h-8 w-8 text-black" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-lg text-black font-extrabold opacity-70">
                No members found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table className={neobrutal.table}>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={neobrutal.head}>Name</TableHead>
                      <TableHead className={neobrutal.head}>Email</TableHead>
                      <TableHead className={neobrutal.head}>Phone</TableHead>
                      <TableHead className={neobrutal.head}>Membership Plan</TableHead>
                      <TableHead className={neobrutal.head}>Status</TableHead>
                      <TableHead className={neobrutal.head}>Expiry Date</TableHead>
                      <TableHead className={neobrutal.head}>Joined On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((member) => (
                      <TableRow
                        key={member.id}
                        className="hover:bg-[#ffde9f] transition-colors cursor-pointer border-b-2 border-black"
                      >
                        <TableCell className={neobrutal.cell}>{member.full_name}</TableCell>
                        <TableCell className={neobrutal.cell}>{member.email}</TableCell>
                        <TableCell className={neobrutal.cell}>{member.phone || "N/A"}</TableCell>
                        <TableCell className={neobrutal.cell}>{member.plan_name || "No Plan"}</TableCell>
                        <TableCell className={neobrutal.cell}>
                          <span
                            className={
                              "px-3 py-1 rounded-lg font-bold text-xs " +
                              getStatusClass(member.membership_status)
                            }
                          >
                            {member.membership_status || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className={neobrutal.cell}>
                          {member.expiry_date
                            ? new Date(member.expiry_date).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell className={neobrutal.cell}>
                          {new Date(member.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TrainerMembers;
