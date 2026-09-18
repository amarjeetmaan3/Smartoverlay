<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartOverlay — Controller</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/theme.css">
  <link rel="stylesheet" href="css/dashboard.css">
  <link rel="stylesheet" href="css/editor.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>

<body>
  <div class="controller-app">

    <header class="topbar glass">
      <a class="brand" href="index.html">
        <span class="brand-mark small">SO</span>
        <span>SmartOverlay</span>
      </a>

      <div class="topbar-center">
        <span class="live-dot"></span>
        <span id="connectionText">Local Preview</span>
      </div>

      <div class="top-actions">
        <button class="icon-btn" id="saveBtn" type="button">Save</button>
        <a class="icon-btn" href="overlay.html">Overlay ↗</a>
      </div>
    </header>

    <div class="workspace">

      <!-- LEFT TOOL PANEL -->
      <aside class="sidebar glass">

        <div class="panel-title">TOOLS</div>

        <button class="tool-btn active" data-tool="select" type="button">
          ↖ <span>Select</span>
        </button>

        <button class="tool-btn" data-tool="text" type="button">
          T <span>Text</span>
        </button>

        <button class="tool-btn" data-tool="image" type="button">
          ▧ <span>Image</span>
        </button>

        <button class="tool-btn" data-tool="pdf" type="button">
          ▤ <span>PDF</span>
        </button>

        <button class="tool-btn" data-tool="question" type="button">
          ? <span>Question</span>
        </button>

        <button class="tool-btn" data-tool="timer" type="button">
          ◷ <span>Timer</span>
        </button>

        <button class="tool-btn" data-tool="score" type="button">
          # <span>Score</span>
        </button>

        <button class="tool-btn" data-tool="camera" type="button">
          ● <span>Camera</span>
        </button>

        <!-- MEDIA UPLOAD -->
        <div class="panel-title lower">MEDIA</div>

        <input
          id="mediaFileInput"
          type="file"
          accept="image/*,application/pdf,video/*,audio/*"
          hidden
        >

        <button
          class="tool-btn"
          id="uploadMediaBtn"
          type="button"
        >
          ↑ <span>Upload Media</span>
        </button>

        <div id="uploadStatus" class="upload-status" aria-live="polite"></div>

        <!-- SCENES -->
        <div class="panel-title lower">SCENES</div>

        <button class="scene-btn active" type="button">Intro</button>
        <button class="scene-btn" type="button">Question</button>
        <button class="scene-btn" type="button">Explanation</button>
        <button class="scene-btn" type="button">Test</button>
        <button class="scene-btn" type="button">Result</button>

        <button class="add-scene" type="button">
          + New Scene
        </button>

      </aside>


      <!-- CENTER EDITOR -->
      <main class="editor-area">

        <div class="editor-toolbar glass">

          <div>
            <strong>Scene:</strong>
            <span id="sceneName">Intro</span>
          </div>

          <div class="toolbar-actions">

            <button type="button" id="undoBtn">
              ↶
            </button>

            <button type="button" id="redoBtn">
              ↷
            </button>

            <button type="button" id="addBoxBtn">
              + Add Box
            </button>

            <button type="button" id="clearBtn">
              Clear
            </button>

          </div>

        </div>


        <div class="canvas-wrap">

          <div
            class="canvas"
            id="canvas"
            aria-label="SmartOverlay preview canvas"
          >

            <div class="canvas-grid"></div>

            <div
              class="canvas-hint"
              id="canvasHint"
            >
              Your live canvas
              <br>
              <small>Select a tool or add a box</small>
            </div>

          </div>

        </div>

      </main>


      <!-- RIGHT PROPERTIES -->
      <aside class="properties glass">

        <div class="panel-title">
          PROPERTIES
        </div>


        <div
          class="empty-state"
          id="propertiesEmpty"
        >

          <div class="empty-icon">
            ◇
          </div>

          <strong>
            Select an element
          </strong>

          <p>
            Position, size, opacity, color and behavior controls will appear here.
          </p>

        </div>


        <div
          id="propertiesForm"
          class="properties-form hidden"
        >

          <label>
            Text
            <input
              id="textInput"
              type="text"
              value="SmartOverlay"
            >
          </label>


          <div class="two-col">

            <label>
              X
              <input
                id="xInput"
                type="number"
                value="0"
              >
            </label>

            <label>
              Y
              <input
                id="yInput"
                type="number"
                value="0"
              >
            </label>

          </div>


          <div class="two-col">

            <label>
              Width
              <input
                id="wInput"
                type="number"
                value="320"
              >
            </label>

            <label>
              Height
              <input
                id="hInput"
                type="number"
                value="120"
              >
            </label>

          </div>


          <label>
            Opacity
            <input
              id="opacityInput"
              type="range"
              min="0"
              max="100"
              value="100"
            >
          </label>


          <button
            class="btn primary full"
            id="deleteBtn"
            type="button"
          >
            Delete Element
          </button>

        </div>

      </aside>

    </div>

  </div>


  <!-- SUPABASE + CONTROLLER -->
  <script type="module">

    import {
      uploadFile
    } from "./js/media-manager.js";

    const fileInput =
      document.getElementById("mediaFileInput");

    const uploadButton =
      document.getElementById("uploadMediaBtn");

    const uploadStatus =
      document.getElementById("uploadStatus");


    uploadButton.addEventListener("click", () => {
      fileInput.click();
    });


    fileInput.addEventListener("change", async (event) => {

      const file =
        event.target.files?.[0];

      if (!file) return;


      uploadStatus.textContent =
        "Uploading...";


      uploadButton.disabled = true;


      try {

        let folder = "media";

        if (file.type === "application/pdf") {
          folder = "pdf";
        }

        else if (file.type.startsWith("image/")) {
          folder = "images";
        }

        else if (file.type.startsWith("video/")) {
          folder = "media/video";
        }

        else if (file.type.startsWith("audio/")) {
          folder = "media/audio";
        }


        const result =
          await uploadFile(file, folder);


        uploadStatus.textContent =
          "Uploaded ✓";


        console.log(
          "SmartOverlay File:",
          result
        );


        window.dispatchEvent(
          new CustomEvent(
            "smartoverlay:file-uploaded",
            {
              detail: result
            }
          )
        );

      }

      catch (error) {

        console.error(
          "Upload failed:",
          error
        );


        uploadStatus.textContent =
          "Upload failed";


        alert(
          error?.message ||
          "File upload failed."
        );

      }

      finally {

        uploadButton.disabled = false;

        fileInput.value = "";

      }

    });

  </script>


  <script
    type="module"
    src="js/controller.js"
  ></script>

</body>
</html>
