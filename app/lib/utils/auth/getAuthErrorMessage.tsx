import { AlertTriangle, Clock, Compass, Lock, Mail, Shield } from 'lucide-react'

const getAuthErrorMessage = (error: string) => {
  switch (error) {
    case 'AccessDenied':
      return {
        icon: Shield,
        title: 'Ahoy There, Landlubber!',
        message:
          "Ye tried to board our ship, but unfortunately yer name ain't on the crew manifest, matey! Only registered seafarin' folk of this CORE chapter can access these waters."
      }

    case 'Verification':
      return {
        icon: Clock,
        title: 'Message in a Bottle Expired!',
        message:
          'That magic link has sailed away into the sunset, captain! The verification has expired or been used already. Request a fresh bottle with a new message.'
      }

    case 'EmailSignin':
      return {
        icon: Mail,
        title: "Parrot Couldn't Deliver!",
        message:
          "Our messenger parrot had trouble deliverin' yer message, mate! The email couldn't be sent. Check yer email address and try sendin' another bottle."
      }

    case 'OAuthSignin':
    case 'OAuthCallback':
      return {
        icon: AlertTriangle,
        title: 'Rough Seas with the Provider!',
        message:
          "The winds weren't favorable with the signin service, captain! There was trouble connectin' to the authentication provider. Try again when the seas are calmer."
      }

    case 'SessionRequired':
      return {
        icon: Lock,
        title: 'Need to Show Yer Papers!',
        message:
          "This area be restricted to crew members only, savvy? Ye need to sign in first before explorin' these waters."
      }

    case 'Configuration':
      return {
        icon: Compass,
        title: "Ship's Navigation is Broken!",
        message:
          "There be somethin' wrong with the ship's compass, mate! Our technical crew is workin' on fixin' the navigation. Try again later."
      }

    default:
      return {
        icon: AlertTriangle,
        title: 'Unknown Waters Ahead!',
        message:
          "We've sailed into uncharted territory, captain! Somethin' unexpected happened. Try navigatin' these waters again."
      }
  }
}

export default getAuthErrorMessage
