import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SecondPage from "./SecondPage";
import {
  Reality,
  SceneGraph,
  BoxEntity,
  ModelEntity,
  UnlitMaterial,
  ModelAsset,
} from "@webspatial/react-sdk";

declare const __XR_ENV_BASE__: string;

// Element types for Little Alchemy
type ElementType =
  | "air"
  | "earth"
  | "fire"
  | "water"
  | "plant"
  | "rain"
  | "mud"
  | "energy"
  | "stone"
  | "steam";

interface Element {
  id: ElementType;
  name: string;
  emoji?: string;
}

const BASIC_ELEMENTS: Element[] = [
  { id: "air", name: "Air", emoji: "💨" },
  { id: "earth", name: "Earth", emoji: "🌍" },
  { id: "fire", name: "Fire", emoji: "🔥" },
  { id: "water", name: "Water", emoji: "💧" },
  { id: "plant", name: "Plant", emoji: "🌱" },
  { id: "rain", name: "Rain", emoji: "🌧️" },
  { id: "mud", name: "Mud", emoji: "🟤" },
  { id: "energy", name: "Energy", emoji: "⚡" },
  { id: "stone", name: "Stone", emoji: "🪨" },
  { id: "steam", name: "Steam", emoji: "💨" },
];

function App() {
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(
    null
  );
  const [createdScenes, setCreatedScenes] = useState<ElementType[]>([]);

  const handleElementClick = (element: ElementType) => {
    setSelectedElement(element);

    // Create a volume scene for the selected element
    createVolumeScene(element);

    // Track created scenes
    if (!createdScenes.includes(element)) {
      setCreatedScenes([...createdScenes, element]);
    }
  };

  const createVolumeScene = (elementType: ElementType) => {
    // TODO: Implement WebSpatial volume scene creation
    // This will create a second volume scene with the 3D model of the element
    console.log(`Creating volume scene for element: ${elementType}`);

    // Placeholder for WebSpatial API call
    // Example structure (actual API may vary):
    // const session = getSession();
    // if (session) {
    //   session.createVolumeScene({
    //     element: elementType,
    //     // ... other config
    //   });
    // }
  };

  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route
          path="/"
          element={
            <div className="main-layout" enable-xr>
              <div className="menu-column" enable-xr>
                <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  Elements
                </h2>
                <div className="element-menu" enable-xr>
                  {BASIC_ELEMENTS.map((element) => (
                    <button
                      key={element.id}
                      className={`element-button ${
                        selectedElement === element.id ? "selected" : ""
                      }`}
                      onClick={() => handleElementClick(element.id)}
                      enable-xr
                    >
                      <span className="element-emoji" enable-xr>
                        {element.emoji}
                      </span>
                      <span className="element-name" enable-xr>
                        {element.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="right-area" enable-xr>
                <div className="top-section" enable-xr>
                  {selectedElement ? (
                    <div className="element-display" enable-xr>
                      <h3>
                        Selected:{" "}
                        {
                          BASIC_ELEMENTS.find((e) => e.id === selectedElement)
                            ?.name
                        }
                      </h3>
                      <p>Volume scene created for: {selectedElement}</p>
                    </div>
                  ) : (
                    <div className="element-display" enable-xr>
                      <p>Click an element to create a 3D volume scene</p>
                    </div>
                  )}
                </div>
                <div className="bottom-section" enable-xr>
                  <h4>Created Scenes:</h4>
                  {createdScenes.length > 0 ? (
                    <ul className="scene-list" enable-xr>
                      {createdScenes.map((scene) => {
                        const element = BASIC_ELEMENTS.find(
                          (e) => e.id === scene
                        );
                        return (
                          <li key={scene}>
                            {element?.emoji} {element?.name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>No scenes created yet</p>
                  )}
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
