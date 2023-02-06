import { _decorator, Component, dragonBones, Node, SortingLayers, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller')
export class controller extends Component {
    @property(Node)
    private nodeButton: Node;

    private _spriteButton: Sprite;

    @property(SpriteFrame)
    addSpriteFrame: SpriteFrame;

    //
    private _armatureDisplay: dragonBones.ArmatureDisplay | null = null;
    private _characterSlots: dragonBones.Slot[];

    hairList: dragonBones.DisplayData[] = [];

    onLoad() {
        this._armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
        this._spriteButton = this.nodeButton.getComponent(Sprite);
    }

    start() {
        let armature = this._armatureDisplay.armature();
        this._characterSlots = armature.getSlots();

        let hairSlot: dragonBones.Slot = this._characterSlots.find((value) => {
            return value.name === "eyes";
        });;

        this.hairList = hairSlot._displayDatas;

        console.log(this.hairList[0].texture.spriteFrame);



        //let a: dragonBones.CCTextureData = this.hairList[0];

        hairSlot._setColor(new dragonBones.ColorTransform(1, 255 / 255, 0 / 255, 0 / 255, 0, 0, 0, 0));

        let a = this.hairList[0];
        a.name = "add";
        a.texture.spriteFrame = this.addSpriteFrame;

        this.hairList.push(a);

        this.hairList.map((value) => {
            console.log(value.name);

        });

        this._spriteButton.spriteFrame = this.hairList[3].texture.spriteFrame;

        hairSlot.displayIndex = 0;
    }

    update(deltaTime: number) {

    }

    convertToARGB() {

    }

}


