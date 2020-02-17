// Set API Configuration

Dashboard.value('config_api',
        {
            "api_server": "https://api.nextwab.com",
            "endpoints": {

                // Section VPS
                VPS:
                        {
                            Add: '/vps/create.php',
                            Update: '/vps/update.php',
                            List: '/vps/GetList',
                            List_OS: '/vps/get_list_os.php',
                            Delete: '/vps/delete.php',
                            Pricing: '/vps/get_pricing.php',
                            SetPower: '/vps/set_power.php'
                        }
                ,

                // Section VPS
                Domain:
                        {
                            Check: '/domains/check.php',
                            Add: '/domains/add.php',
                            Buy: '/domains/buy.php',
                            List: '/domain/GetList',
                            Delete: '/domains/delete.php',
                            SetCloudServer: '/domains/set_cloud_device.php',
                            GetCMS_List: '/cms/get_list.php',
                            GetDNS_Config: '/domains/get_config.php',
                            SetDNS_Config: '/domains/set_config.php',
                            SetNS_Config: '/domain/Set_NameServers',
                            SetCMS: '/cms/install.php',
                            Reset_Config: '/domain/Reset_Config',
                            Request_AuthCode: '/domain/Request_AuthCode',
                        }
                ,

                // Section MySQL
                Database:
                        {
                            List: '/mysql/get_list.php',
                            Add_User: '/mysql/add_user.php',
                            Add_Database: '/mysql/add_database.php',
                            Delete_User: '/mysql/delete_user.php',
                            Delete_Database: '/mysql/delete_database.php'
                        }
                ,
                // Section User
                User:
                        {
                            Login: '/account/login.php',
                            GetInfos: '/User/Get_Data',
                            Update: '/account/update.php',
                            Create: '/account/create.php',
                            Recover_Password_Link: '/User/Recover_Password_Link',
                            Reset_Password: '/User/Reset_Password'
                        },

                // Section Support
                Ticket:
                        {
                            List: '/tickets/get_list.php',
                            Add: '/tickets/add.php'
                        },

                // Section VPS
                Mailbox:
                        {
                            Add: '/mailbox/Create',
                            Add_Alias: '/mailbox_alias/Create',
                            List: '/mailbox/GetList',
                            List_Alias: '/mailbox_alias/GetList',
                            Delete: '/mailbox/Delete',
                            Delete_Alias: '/mailbox_alias/Delete',
                            UpdatePassword: '/mailbox/UpdatePassword'
                        }
                ,

                // VPS 
                VPS_GetPricing: '/vps/get_pricing.php',
                VPS_SetRawData: '/vps/set_data_raw.php',
                VPS_SetPower: '/vps/set_power.php',

                //USER
                USER_Creation: '/account/create.php',
                USER_Check_API_Key: '/account/check_api_key.php',

                // CMS
                CMS_GetList: '/cms/get_list.php',
                CMS_Install: '/cms/install.php'

            }
        }
);