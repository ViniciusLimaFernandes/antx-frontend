import { Icon } from 'leaflet'

import warning from 'assets/images/warning.png'
import danger from 'assets/images/danger.png'
import success from 'assets/images/success.png'
import user from 'assets/images/user.png'

const props = {
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
}

const userProps = {
  ...props,
  shadowUrl: '',
  iconSize: [40, 40],
  iconAnchor: [20, 35],
  shadowSize: []
}

export const Warning = new Icon({ iconUrl: warning, ...props })
export const Success = new Icon({ iconUrl: success, ...props })
export const Danger = new Icon({ iconUrl: danger, ...props })
export const User = new Icon({ iconUrl: user, ...userProps })
