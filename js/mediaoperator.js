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

        currentPreset.stages.forEach((stage) => {

            if (!stage.media?.enabled) return;

            const input = document.getElementById(stage.media.key);

           if (
    input &&
    latestData?.presentation?.media?.[stage.media.key]?.url !== undefined
) {
    input.value =
        latestData.presentation.media[stage.media.key].url;
}

        });

    }
);

currentPreset.stages.forEach((stage) => {

    if (
        !stage.media ||
        !stage.media.enabled
    ) {
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

        const layout =
    document.createElement("select");

layout.id =
    stage.media.key + "_layout";

[
    "banner",
    "fullscreen",
    "overlay"
].forEach((option) => {

    const item =
        document.createElement("option");

    item.value = option;
    item.textContent = option;

    layout.appendChild(item);

});

layout.value =
    stage.media.layout || "banner";
      
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
        const saved =
    document.createElement("span");

saved.textContent = "✔";

saved.style.color = "limegreen";
saved.style.marginLeft = "10px";
saved.style.visibility = "hidden";

        button.addEventListener(
            "click",
            async () => {

               await saveMediaUrl(
    court,
    stage.media.key,
    input.value,
    layout.value
);

                console.log(
                    "Saved:",
                    stage.media.key,
                    input.value
                );
                saved.style.visibility = "visible";

setTimeout(() => {

    saved.style.visibility = "hidden";

}, 2000);

            }
        );

        container.appendChild(label);
container.appendChild(input);
container.appendChild(layout);
container.appendChild(button);
container.appendChild(saved);

        mediaSlots.appendChild(container);

    }
);