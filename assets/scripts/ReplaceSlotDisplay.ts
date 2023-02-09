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
    id: object[] | null = null;

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

        buttonTextureNode.getComponent(ButtonTextureController).setIdInData(Configs.changeArmatureDisplayToObject(this._armatureDisplay));

        buttonTextureNode.getComponent(ButtonTextureController).setDataButtonDelete((buttonNodeInput: Node, idInput: object[]) => { this.getDataButtonTexture(buttonNodeInput, idInput); });
    }

    private onChangeView(replaceArmatureDisplay: dragonBones.ArmatureDisplay): void {
        Configs.SetIndexAndColorByArmatureDisplay(replaceArmatureDisplay, this.armatureDisplay);
    }

    private onButtonDelete(): void {
        if (!this.buttonTextureNode || !this.id) return;

        this.buttonTextureNode.destroy();

        let index = PLayerData.instance.arrButtonData.findIndex((item) => { this.id === item; });

        PLayerData.instance.arrButtonData.splice(index, 1);

        DataSave.saveDataStorage(Configs.KEY_STORAGE_ACCESS, PLayerData.instance.arrButtonData);

        let listButtonTexture = this.contentScrollView.children;

        console.log("deleted");

        this.id = null;
    }

    getDataButtonTexture(buttonNodeInput: Node, idInput: object[]) {
        this.buttonTextureNode = buttonNodeInput;
        this.id = idInput;
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

            buttonTextureNode.getComponent(ButtonTextureController).setIdInData(Configs.changeArmatureDisplayToObject(this._armatureDisplay));

            buttonTextureNode.getComponent(ButtonTextureController).setDataButtonDelete((buttonNodeInput: Node, idInput: object[]) => { this.getDataButtonTexture(buttonNodeInput, idInput); });

            //
            console.log(buttonTextureNode.getComponent(ButtonTextureController).armatureDisplay);

        });
    }

    onRedButton() {
        Configs.changeColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(255, 0, 0));
    }

    onBlueButton() {
        Configs.changeColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(0, 0, 255));
    }

    onGreenButton() {
        Configs.changeColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(0, 255, 0));
    }

    onBlackButton() {
        Configs.changeColorRGBToSlot(this._armatureDisplay.armature().getSlot("hair"), new Color(0, 0, 0));
    }
}


