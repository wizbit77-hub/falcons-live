import {
    currentPreset
} from "./matchsetup.js";
import {
    watchCourt,
    saveMediaUrl
} from "./game.js";

/*****************************************************************
* COURT SETUP
*****************************************************************/

const court =
    new URLSearchParams(
        window.location.search
    ).get("court") ||
    "court1";

console.log(
    "Media Operator Loaded"
);

const mediaSlots =
    document.getElementById(
        "mediaSlots"
    );

let latestData = null;

watchCourt(
    court,
    (data) => {

        latestData = data;

    }
);

currentPreset.stages.forEach(
    (stage) => {

        if (!stage.media?.enabled) {
            return;
        }

        const container =
            document.createElement("div");

        container.className =
            "mediaSlot";

        const label =
            document.createElement("h3");

        label.textContent =
            stage.media.label;

        const input =
            document.createElement("input");

        input.type = "text";
        input.placeholder = "Enter media URL...";
        input.id = stage.media.key;
      
        if (
    latestData?.presentation?.media?.[
        stage.media.key
    ]
) {

    input.value =
        latestData.presentation.media[
            stage.media.key
        ];

}

        const button =
            document.createElement("button");

        button.textContent = "Save";

        button.addEventListener(
            "click",
            async () => {

                await saveMediaUrl(
                    court,
                    stage.media.key,
                    input.value
                );

                console.log(
                    "Saved:",
                    stage.media.key,
                    input.value
                );

            }
        );

        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(button);

        mediaSlots.appendChild(container);

    }
);