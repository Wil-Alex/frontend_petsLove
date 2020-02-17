import { observable, action, runInAction } from 'mobx'
import PetsService from 'services/PetsService'

class PetIdStore {
  constructor() {
    this.petsService = new PetsService()
  }

  @observable id = ''
  @observable pet = []
  @observable images = []
  @observable imagePet = []
  @observable gender = ''
  @observable age = ''
  @observable categorie = ''
  @observable activity = ''
  @observable isLoading = false

  @action
  async getPetId(id) {
    this.isLoading = true
    try {
      const response = await this.petsService.getPetId(id)

      runInAction(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
        this.pet = response
        this.categorie = this.pet.categorie.name
        this.gender = this.pet.gender.name
        this.activity = this.pet.activity.activity
        this.age = this.pet.age.age
        this.imagePet = this.pet.image
        this.images = this.pet.image

        console.log(this.age)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}

export default PetIdStore
