import { Color, SpriteFrame, dragonBones } from "cc";
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
            let a = { name: item.name, index: item.displayIndex, colorTransform: item._colorTransform };

            obj.push(a);
        });

        PLayerData.instance.arrButtonData.push(obj);

        DataSave.saveDataStorage(Configs.KEY_STORAGE_ACCESS, PLayerData.instance.arrButtonData);
    }

    public static setArmatureDisplayByObj(armatureDisplayInput: dragonBones.ArmatureDisplay, objectsInput: object[]): void {
        let slots = armatureDisplayInput.armature().getSlots();

        slots.map((slot) => {
            let object = objectsInput.filter((obj) => { return obj["name"] === slot.name; })[0];

            slot.displayIndex = object["index"];

            let colorTransform = Configs.changeObjectToColorTransform(object["colorTransform"]);
            slot._setColor(colorTransform);
        });
    }

    public static getSpriteFrameFromSlot(armatureDisplay: dragonBones.ArmatureDisplay, slotName: string): SpriteFrame[] {
        let armature = armatureDisplay!.armature();
        let slot = armature.getSlot(slotName);
        let slotDatas = slot._displayDatas;

        let arrSpriteFrame: SpriteFrame[] = [];

        slotDatas.map((value) => {
            arrSpriteFrame.push(value.texture.spriteFrame);
        });

        return arrSpriteFrame;
    }

    public static setColorRGBToSlot(slot: dragonBones.Slot, color: Color): void {
        slot._setColor(new dragonBones.ColorTransform(1, color.r / 255, color.g / 255, color.b / 255, 0, 0, 0, 0));
    }

    public static changeObjectToColorTransform(objInput: object): dragonBones.ColorTransform {
        return new dragonBones.ColorTransform(1, objInput["redMultiplier"], objInput["greenMultiplier"], objInput["blueMultiplier"], 0, 0, 0, 0);
    }
}