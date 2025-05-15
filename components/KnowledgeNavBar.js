import { useState, useContext } from "react";
import { Drawer } from "antd";
import { StoreContext } from "../store";

import KnowledgeNavItem from "./KnowledgeNavItem";

export default function KnowledgeNavBar() {
  const [isOnTouch, setIsOnTouch] = useState(false);
  const handleCloseDrawer = () => setIsOnTouch(false);
  // const { state: { userSignin: { userInfo } } } = useContext(StoreContext);

  return (
    <div>
      <div className="know-nav-bar collapse-mobile">
        <KnowledgeNavItem
          to="/knowledge/iekei"
          className="know-nav-item"
          activeClassName="know-nav-item--active"
        >
          家系
        </KnowledgeNavItem>
        <KnowledgeNavItem
          to="/knowledge/jiro"
          className="know-nav-item"
          activeClassName="know-nav-item--active"
        >
          二郎系
        </KnowledgeNavItem>
        <KnowledgeNavItem
          to="/knowledge/musashi"
          className="know-nav-item"
          activeClassName="know-nav-item--active"
        >
          麵屋武藏系
        </KnowledgeNavItem>
        <KnowledgeNavItem
          to="/knowledge/hakata"
          className="know-nav-item"
          activeClassName="know-nav-item--active"
        >
          博多豚骨系
        </KnowledgeNavItem>
        <KnowledgeNavItem
          to="/knowledge/gyokai"
          className="know-nav-item"
          activeClassName="know-nav-item--active"
        >
          魚介系
        </KnowledgeNavItem>
      </div>
    </div>
  );
}