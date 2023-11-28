import React from 'react'
import PanelNav from './common/nav/PanelNav'
import GroupList from './main/grouplist/GroupList'
import TopFive from './main/topfive/TopFive'
import PanelRounting from './common/routing/PanelRouting'
import TopTyper from './main/toptyper/TopTyper'
import Ads from './main/ads/Ads'
import PanelFooter from './common/footer/PanelFooter'

function Panel () {
  return (
    <>
      <PanelNav />
      <GroupList />
      <TopFive />
      <PanelRounting />
      <TopTyper />
      <Ads />
      <PanelFooter />
    </>
  )
}

export default Panel

/*





 */
