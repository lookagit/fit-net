import React from "react";

const AfterSearchItemCouch = ({couchProp}) => (
  <div
    style={{
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: '20px',
    }}
  >
    <div
      style={{
        flex: 1.5,
        backgroundImage: `url(${couchProp.imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "300px",
        height: "300px",
        borderRadius: "5px"
      }}
    />
    <div
      style={{
        flex: 2.3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "300px",
        alignItems: "flex-start",
        paddingLeft: "10px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "250px",
          alignItems: "flex-start",
          paddingLeft: "10px"
        }}
      >
        <h3 style={{ fontSize: "40px", color: "#2a87e9", fontWeight: "700" }}>
          {`${couchProp.firstName} ${couchProp.lastName}`}
        </h3>
        <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
          {`${couchProp.birthPlace}`}
        </h4>
        <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
          {`${couchProp.birthDay}`}
        </h4>
        <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
          {`Fitness klub Agoga`}
        </h4>
        <h4 style={{ fontSize: "25px", color: "#fff", fontWeight: "700" }}>
          Tagovi: Fitnes, MMA, Bodybuilding
        </h4>
      </div>
    </div>
    <div
      style={{
        flex: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        height: "300px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          height: "250px"
        }}
      >
        <h5 style={{ fontSize: "22px", color: "#fff", fontWeight: "700" }}>
          {`${couchProp.about}`}
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(42, 135, 233)",
            width: "135px",
            borderRadius: "10px",
            padding: "13px"
          }}
        >
          <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: "700" }}>
            VIŠE
          </h3>
        </div>
      </div>
    </div>
  </div>
); 
export default AfterSearchItemCouch;