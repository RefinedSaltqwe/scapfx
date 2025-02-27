// // pages/dashboard.tsx
// import { getSession } from "next-auth/react";

// const Dashboard = ({ session }) => {
//   if (!session) {
//     return <p>You must be logged in to view this page.</p>;
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome, {session.user.name}</p>
//     </div>
//   );
// };

// export const getServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return { redirect: { destination: "/signin", permanent: false } };
//   }

//   return { props: { session } };
// };

// export default Dashboard;
