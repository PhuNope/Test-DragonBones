import { _decorator, Button, Color, Component, dragonBones, Node, randomRangeInt, SpriteFrame, log, Prefab, instantiate } from 'cc';
import { DataSave } from './untils/DataSave';
import { Configs } from './untils/Configs';
import { PLayerData } from './untils/PLayerData';
import { ButtonTextureController } from './ButtonTextureController';
const { ccclass, property } = _decorator;

@ccclass('ReplaceSlotDisplay')
export class ReplaceSlotDisplay extends Component {
    @property({ type: dragonBones.ArmatureDisplay })
    armatureDisplay: dragonBones.ArmatureDisplay | null = null;
    @property({ type: dragonBones.ArmatureDisplay })
    replaceArmatureDisplay: dragonBones.ArmatureDisplay | null = null;

    private _armatureDisplay: dragonBones.ArmatureDisplay | null = null;
    //private _characterSlots: dragonBones.Slot[];

    eyesList: dragonBones.DisplayData[] = [];

    _eyesSlotView: dragonBones.Slot;

    //scroll view
    @property(Node)
    contentScrollView: (Node) | null = null;

    //button texture
    @property(Prefab)
    buttonTexturePre: Prefab | null = null;

    @property(Node)
    buttonDelete: Node | null = null;

    //button texture
    buttonTextureNode: Node | null = null;
    index: number | null = null;

    onLoad() {
        this._armatureDisplay = this.armatureDisplay;
    }

    start() {
        this.replaceArmatureDisplay!.node.active = false;

        //
        let armature = this._armatureDisplay.armature();
        //this._characterSlots = armature.getSlots();

        this._eyesSlotView = armature.getSlot("eyes");

        //let eyesSlotReplace = this.getSlotDataName(this.replaceArmatureDisplay, "eyes");

        //this.eyesList = eyesSlotView._displayDatas;

        // let factory = dragonBones.CCFactory.getInstance();
        // //factory.replaceSlotDisplay(this.replaceArmatureDisplay!.getArmatureKey(),this.replaceArmatureDisplay!.armatureName,"eyes",)
        // factory.replaceSlotDisplayList(this.replaceArmatureDisplay!.getArmatureKey(), this.armatureDisplay!.armatureName, "eyes", this._eyesSlotView);

        // armature.invalidUpdate();

        // this._eyesSlotView.displayIndex = 2;

        this.onLoadDataSaved();
    }

    // private getSlotDataName(armatureDisplay: dragonBones.ArmatureDisplay, nameSlot: string): dragonBones.Slot {
    //     let armature = armatureDisplay.armature();
    //     return armature.getSlot(nameSlot);
    // }

    update(deltaTime: number) {

    }

    //event button random
    private onRandomButton() {
        // if (this._eyesSlotView.displayIndex !== 0) {
        //     this._eyesSlotView.displayIndex--;
        //     return;
        // }

        // let factory = dragonBones.CCFactory.getInstance();
        // //factory.replaceSlotDisplay(this.replaceArmatureDisplay!.getArmatureKey(),this.replaceArmatureDisplay!.armatureName,"eyes",)
        // factory.replaceSlotDisplayList(this.armatureDisplay!.getArmatureKey(), this.armatureDisplay!.armatureName, "eyes", this._eyesSlotView);
        // //save
        // this._armatureDisplay.armature().invalidUpdate();

        // this.eyesList = this._eyesSlotView._displayDatas;
        // let index = this.eyesList.findIndex((value) => { return value.name === "eyes_blank"; });
        // this.eyesList.splice(index, 1);

        // this._eyesSlotView.displayIndex = this._eyesSlotView._displayDatas.length - 1;

        // this._eyesSlotView._setDisplayList;

        let slots = this._armatureDisplay!.armature().getSlots();

        slots.map((value) => {
            value.displayIndex = randomRangeInt(0, value._displayDatas.length - 1);
        });
    }

    private onSaveButton() {
        // if (this._eyesSlotView.displayIndex !== this._eyesSlotView._displayDatas.length - 1) {
        //     this._eyesSlotView.displayIndex++;
        //     return;
        // }

        // let factory = dragonBones.CCFactory.getInstance();
        // //factory.replaceSlotDisplay(this.replaceArmatureDisplay!.getArmatureKey(),this.replaceArmatureDisplay!.armatureName,"eyes",)
        // factory.replaceSlotDisplayList(this.replaceArmatureDisplay!.getArmatureKey(), this.replaceArmatureDisplay!.armatureName, "eyes", this._eyesSlotView);
        // //save
        // this._armatureDisplay.armature().invalidUpdate();

        // this.eyesList = this._eyesSlotView._displayDatas;
        // let index = this.eyesList.findIndex((value) => { return value.name === "eyes_blank"; });
        // this.eyesList.splice(index, 1);

        // this._eyesSlotView.displayIndex = 0;

        //PLayerData.instance.arrButtonData.push(this.armatureDisplay);

        //DataSave.saveDataStorage(Configs.KEY_STORAGE_ACCESS, PLayerData.instance.arrButtonData);
        Configs.addToListAndSave(this.armatureDisplay);

        let buttonTextureNode = instantiate(this.buttonTexturePre);

        this.contentScrollView.addChild(buttonTextureNode);

        //
        // let obj: object[] = [];

        // this._armatureDisplay.armature().getSlots().map((item) => {
        //     let a = { name: item.name, index: item.displayIndex, color: item._colorTransform };

        //     obj.push(a);
        // });

        buttonTextureNode.getComponent(ButtonTextureController).setUpAddSave(this._armatureDisplay, (inputReplaceDisplay) => { this.onChangeView(inputReplaceDisplay); });

        buttonTextureNode.getComponent(ButtonTextureController).setIndexInData(PLayerData.instance.arrButtonData.length - 1);

        buttonTextureNode.getComponent(ButtonTextureController).setDataButtonDelete((buttonNodeInput: Node, indexInput: number) => { this.getDataButtonTexture(buttonNodeInput, indexInput); });
    }

    private onChangeView(replaceArmatureDisplay: dragonBones.ArmatureDisplay): void {
        Configs.SetIndexAndColor(replaceArmatureDisplay, this.armatureDisplay);
    }

    private onButtonDelete(): void {
        console.log(PLayerData.instance.arrButtonData);

        console.log(this.index);

        if (!this.buttonTextureNode || !this.index) return;

        this.buttonTextureNode.destroy();

        PLayerData.instance.arrButtonData.splice(this.index, 1);

        DataSave.saveDataStorage(Configs.KEY_STORAGE_ACCESS, PLayerData.instance.arrButtonData);

        console.log(PLayerData.instance.arrButtonData);
    }

    getDataButtonTexture(buttonNodeInput: Node, indexInput: number) {
        this.buttonTextureNode = buttonNodeInput;
        this.index = indexInput;
    }

    onLoadDataSaved() {
        let buttonDataObj = PLayerData.instance.arrButtonData[PLayerData.instance.arrButtonData.length - 1];

        // let slots = this._armatureDisplay.armature().getSlots();

        // buttonDataObj.map((itemGameData) => {
        //     let index = slots.findIndex((itemSlots) => {
        //         return itemSlots.name === itemGameData["name"];
        //     });

        //     slots[index].displayIndex = itemGameData["index"];

        //     slots[index]._setColor(itemGameData["color"]);
        // });

        Configs.setArmatureDisplayByObj(this._armatureDisplay, buttonDataObj);

        //set list button
        PLayerData.instance.arrButtonData.map((item, index) => {
            let buttonTextureNode = instantiate(this.buttonTexturePre);

            this.contentScrollView.addChild(buttonTextureNode);

            buttonTextureNode.getComponent(ButtonTextureController).setUpOnLoad(item, (inputReplaceDisplay) => { this.onChangeView(inputReplaceDisplay); });

            buttonTextureNode.getComponent(ButtonTextureController).setIndexInData(index);

            buttonTextureNode.getComponent(ButtonTextureController).setDataButtonDelete((buttonNodeInput: Node, indexInput: number) => { this.getDataButtonTexture(buttonNodeInput, indexInput); });
        });
    }

    onRedButton() {
        Configs.setColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(255, 0, 0));
    }

    onBlueButton() {
        Configs.setColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(0, 0, 255));
    }

    onGreenButton() {
        Configs.setColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(0, 255, 0));
    }

    onBlackButton() {
        Configs.setColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(0, 0, 0));
    }
}


