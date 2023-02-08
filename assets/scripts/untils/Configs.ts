import { dragonBones } from "cc";
import { PLayerData } from "./PLayerData";
import { DataSave } from "./DataSave";

export class Configs {
    public static GAME_SCENE_NAME = "game";
    public static MENU_SCENE_NAME = "menu";

    public static KEY_STORAGE_ACCESS = "access";

    public static ChangeSlot(replaceArmatureDisplay: dragonBones.ArmatureDisplay, curentArmatureDisplay: dragonBones.ArmatureDisplay, nameSlot: string): void {
        let slot = curentArmatureDisplay.armature().getSlot(nameSlot);

        let factory = dragonBones.CCFactory.getInstance();

        factory.replaceSlotDisplayList(replaceArmatureDisplay!.getArmatureKey(), replaceArmatureDisplay!.armatureName, nameSlot, slot);
        //save
        curentArmatureDisplay.armature().invalidUpdate();
    }

    public static SetIndexAndColor(replaceArmatureDisplay: dragonBones.ArmatureDisplay, curentArmatureDisplay: dragonBones.ArmatureDisplay): void {
        let currentSlots = curentArmatureDisplay.armature().getSlots();

        replaceArmatureDisplay.armature().getSlots().map((replaceItem) => {
            let index = currentSlots.findIndex((itemSlots) => {
                return itemSlots.name === replaceItem.name;
            });

            currentSlots[index].displayIndex = replaceItem.displayIndex;

            currentSlots[index]._setColor(replaceItem._colorTransform);
        });
    }

    public static addToListAndSave(armatureDisplay: dragonBones.ArmatureDisplay): void {
        let obj: object[] = [];

        armatureDisplay.armature().getSlots().map((item) => {
            let a = { name: item.name, index: item.displayIndex, color: item._colorTransform };

            obj.push(a);
        });

        PLayerData.instance.arrButtonData.push(obj);

        DataSave.saveDataStorage(Configs.KEY_STORAGE_ACCESS, PLayerData.instance.arrButtonData);
    }
}