import styles from "../layout/PageLayout.module.css";

export const SmartframePage = () => {
  // const navItems = [
  //   { id: "overview", label: "Overview" },
  //   { id: "features", label: "Features" },
  //   { id: "specification", label: "Technical Specifications" },
  // ];

  return (
    <div className={styles.pageLayout}>
      {/* <SideNav items={navItems} /> */}

      <div
        className={styles.sectionGrid}
        style={
          {
            "--col-text": "1.2fr" /* Give text slightly more space */,
            "--col-view": "0.8fr" /* Squeeze the 3D model slightly */,
            "--max-w": "1400px" /* Widen the entire section */,
            "--grid-gap": "3rem" /* Pull them closer together */,
          } as React.CSSProperties
        }
      >
        <div></div>
        {/* 
        <div className={styles.viewportWrapper}>
          <Viewport3D
            sceneId="profile-portrait"
            buildFn={async () => {
              const width = 8;
              const height = width * 1.28536880290206;
              const profilePic = await new ExhibitBuilder(
                "/profile-no-bg.png",
                ImageExhibit,
                { width: width, height: height },
              ).build();

              return new Scene().addExhibit(profilePic).addEffect(
                new ColoredAsciiEffect({
                  charSize: 6.0,
                  hoverRadius: 0.2,
                }),
              );
            }}
            style={{ width: "100%", height: "500px" }}
          />
        </div> */}
      </div>
    </div>
  );
};
