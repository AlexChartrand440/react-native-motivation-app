import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Icon } from 'react-native-elements'
import routes, { routeKeys } from '../routes'
import { createTabPress } from '../store/navigation/actions'
// import Badge from '../../node_modules/react-native-tab-navigator/Badge'
import { textColor, primaryColor, dark2 } from '../styling'

const styles = {
  tabBarStyle: {
    backgroundColor: 'black',
  },
  tabSelected: {
  },
  titleStyle: {
    color: textColor,
  },
  titleSelected: {
    color: primaryColor,
  },
}

class TabBar extends React.Component {
  static propTypes = {
    activeScene: PropTypes.string.isRequired,
  }

  changeTab(selectedTab) {
    // eslint-disable-next-line
    this.props.dispatchTabPress(selectedTab)
  }

  renderTab(routeKey, routeObj) {
    const selectedTab = this.props.activeScene
    const { title, Component, iconName } = routeObj
    return (
      <Tab
        key={routeKey}
        tabStyle={[{ backgroundColor: dark2 }, selectedTab !== routeKey && styles.tabSelected]}
        titleStyle={[styles.titleStyle]}
        selectedTitleStyle={[styles.titleSelected]}
        selected={selectedTab === routeKey}
        title={selectedTab === routeKey ? title : null}
        renderIcon={() => <Icon name={iconName} color={textColor} size={26} />}
        renderSelectedIcon={() => <Icon name={iconName} color={primaryColor} size={26} />}
        onPress={() => this.changeTab(routeKey)}
      >
        <Component style={styles.tabBarStyle} />
      </Tab>
    )
  }

  render() {
    return (
      <Tabs>
        {
          routeKeys.map(routeKey => this.renderTab(routeKey, routes[routeKey]))
        }
      </Tabs>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchTabPress: tabName => dispatch(createTabPress(tabName)),
})

export default connect(null, mapDispatchToProps)(TabBar)