import { _decorator, Component, dragonBones, Node, SortingLayers, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller')
export class controller extends Component {
    // @property(Node)
    // private nodeButton: Node;

    private _spriteButton: Sprite;

    //
    private _armatureDisplay: dragonBones.ArmatureDisplay | null = null;
    private _characterSlots: dragonBones.Slot[];

    eyesList: dragonBones.DisplayData[] = [];

    onLoad() {
        this._armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
        //this._spriteButton = this.nodeButton.getComponent(Sprite);
    }

    start() {
        // let armature = this._armatureDisplay.armature();
        // this._characterSlots = armature.getSlots();

        // let eyesSlot: dragonBones.Slot = this._characterSlots.find((value) => {
        //     return value.name === "eyes";
        // });;

        // this.eyesList = eyesSlot._displayDatas;

        // console.log(this.eyesList[0]);

        // //let a: dragonBones.CCTextureData = this.hairList[0];

        // eyesSlot._setColor(new dragonBones.ColorTransform(1, 255 / 255, 0 / 255, 0 / 255, 0, 0, 0, 0));

        // let a = [...[this.eyesList[0]]];

        // // a[0].name = "add";
        // // a[0].texture.spriteFrame = this.addSpriteFrame;

        // // this.eyesList.push(a[0]);

        // // this.eyesList.map((value) => {
        // //     console.log(value.name);

        // // });

        // this._spriteButton.spriteFrame = this.eyesList[0].texture.spriteFrame;

        // eyesSlot.displayIndex = 0;
    }

    update(deltaTime: number) {

    }

    convertToARGB() {

    }

}


