import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import Azure from "../../assets/test_img-.png";
import { CopyRegular, ShareRegular } from "@fluentui/react-icons";
import { CommandBarButton, Dialog, Stack, TextField, ICommandBarStyles, IButtonStyles, DefaultButton  } from "@fluentui/react";
import { useContext, useEffect, useState } from "react";
import { HistoryButton, ShareButton } from "../../components/common/Button";
import { AppStateContext } from "../../state/AppProvider";
import { CosmosDBStatus } from "../../api";
// import Select from 'react-select';


const shareButtonStyles: ICommandBarStyles & IButtonStyles = {
    root: {
      width: 86,
      height: 32,
      borderRadius: 4,
      background: 'radial-gradient(109.81% 107.82% at 100.1% 90.19%, #0F6CBD 33.63%, #2D87C3 70.31%, #8DDDD8 100%)',
    //   position: 'absolute',
    //   right: 20,
      padding: '5px 12px',
      marginRight: '20px'
    },
    icon: {
      color: '#FFFFFF',
    },
    rootHovered: {
      background: 'linear-gradient(135deg, #0F6CBD 0%, #2D87C3 51.04%, #8DDDD8 100%)',
    },
    label: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
    },
  };
  {/* changed */}
//   const options = [
//     { value: 'api-test-001', label: 'api-test-001' },
//     { value: 'idx-wipit', label: 'idx-wipit' },
//     { value: 'jman-index-logistics', label: 'jman-index-logistics' },
//     { value: 'hr-resource', label: 'hr-resource' }
//   ]
  {/* changed */}
const Layout = () => {

    
    const [isSharePanelOpen, setIsSharePanelOpen] = useState<boolean>(false);
    const [copyClicked, setCopyClicked] = useState<boolean>(false);
    const [copyText, setCopyText] = useState<string>("Copy URL");
    const appStateContext = useContext(AppStateContext)
    
    // const [selectedSearchIndex, setSelectedSearchIndex] = useState(options[0].value);

    const handleShareClick = () => {
        setIsSharePanelOpen(true);
    };

    const handleSharePanelDismiss = () => {
        setIsSharePanelOpen(false);
        setCopyClicked(false);
        setCopyText("Copy URL");
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopyClicked(true);
    };

    const handleHistoryClick = () => {
        appStateContext?.dispatch({ type: 'TOGGLE_CHAT_HISTORY' })
    };

    useEffect(() => {
        if (copyClicked) {
            setCopyText("Copied URL");
        }
    }, [copyClicked]);

    useEffect(() => {}, [appStateContext?.state.isCosmosDBAvailable.status]);
 {/* changed */}
    // const handleDropdownChange = (selectedOption:any) => {
    //     // Send a POST request to update the search index
    //     setSelectedSearchIndex(selectedOption.value);
    //     fetch("/update-search-index", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ index: selectedOption.value }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data.message);
    //         })
    //         .catch((error) => {
    //             console.error("Error updating search index:", error);
    //         });
    // };
     {/* changed */}

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <Stack horizontal verticalAlign="center" horizontalAlign="space-between"
                // className={styles.headerContainer}
                >
                    <Stack horizontal verticalAlign="center">
                        <img
                            src={Azure}
                            className={styles.headerIcon}
                            aria-hidden="true"
                        />
                        <Link to="/" className={styles.headerTitleContainer}>
                            <p className={styles.headerTitle}>&nbsp;</p>
                        </Link>
        
                    </Stack>
                    <Stack className={styles.ButtonsContainer} horizontal tokens={{ childrenGap: 4 }}>
                            {/* changed */}
                            {/* <p className={styles.dropdownlabel}>Select a knowledge base:</p> */}
                            {/* <Select
                            className={styles.dropdown}
                            options={options}
                            onChange={handleDropdownChange} 
                            placeholder="select a knowledge base"
                            /> */}

                            {/* changed */}
                            {(appStateContext?.state.isCosmosDBAvailable?.status !== CosmosDBStatus.NotConfigured) && 
                                <HistoryButton onClick={handleHistoryClick} text={appStateContext?.state?.isChatHistoryOpen ? "Hide chat history" : "Show chat history"}/>    
                            }
                            <ShareButton onClick={handleShareClick}/>
                    </Stack>

                </Stack>
            </header>
            <Outlet />
            <Dialog 
                onDismiss={handleSharePanelDismiss}
                hidden={!isSharePanelOpen}
                styles={{
                 
                    main: [{
                        selectors: {
                          ['@media (min-width: 480px)']: {
                            maxWidth: '600px',
                            background: "#FFFFFF",
                            boxShadow: "0px 14px 28.8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.2)",
                            borderRadius: "8px",
                            maxHeight: '200px',
                            minHeight: '100px',
                          }
                        }
                      }]
                }}
                dialogContentProps={{
                    title: "Share the web app",
                    showCloseButton: true
                }}
            >
                <Stack horizontal verticalAlign="center" style={{gap: "8px"}}>
                    <TextField className={styles.urlTextBox} defaultValue={window.location.href} readOnly/>
                    <div 
                        className={styles.copyButtonContainer} 
                        role="button" 
                        tabIndex={0} 
                        aria-label="Copy" 
                        onClick={handleCopyClick}
                        onKeyDown={e => e.key === "Enter" || e.key === " " ? handleCopyClick() : null}
                    >
                        <CopyRegular className={styles.copyButton} />
                        <span className={styles.copyButtonText}>{copyText}</span>
                    </div>
                </Stack>
            </Dialog>
        </div>
    );
};

export default Layout;
